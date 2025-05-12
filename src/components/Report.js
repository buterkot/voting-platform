import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import nunitoFont from "../assets/fonts/Nunito-Regular-normal.js";

const exportCSV = (vote, dataSections) => {
    let csvContent = "\uFEFF";
    dataSections.forEach(({ title, data }) => {
        csvContent += `"${title}"\n`;
        data.forEach(row => {
            csvContent += row.map(cell => `"${cell}"`).join(",") + "\n";
        });
        csvContent += "\n";
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `vote-report-${vote.id}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export const Report = async ({ vote, participants, fileType, pieImage, lineImage }) => {
    const votersByOption = vote.options.reduce((acc, option) => {
        acc[option.option_text] = participants
            .filter(p => p.option_text === option.option_text)
            .map(p => `${p.firstname} ${p.lastname} (${p.email})`);
        return acc;
    }, {});

    const pieData = vote.options
        .filter(option => option.vote_count > 0)
        .map(option => ({
            name: option.option_text,
            value: option.vote_count,
        }));

    const timeData = participants
        .sort((a, b) => new Date(a.voted_date) - new Date(b.voted_date))
        .reduce((acc, curr) => {
            const date = new Date(curr.voted_date);
            const timeLabel = date.toLocaleString().slice(0, 16);
            const existing = acc.find(item => item.time === timeLabel);
            if (existing) existing.count += 1;
            else acc.push({ time: timeLabel, count: 1 });
            return acc;
        }, []);

    const fraudAlerts = [];
    const fraudIntervalMinutes = 5;
    const groupedByTime = {};

    participants.forEach(p => {
        const date = new Date(p.voted_date);
        const roundedMinutes = Math.floor(date.getMinutes() / fraudIntervalMinutes) * fraudIntervalMinutes;
        const timeLabel = `${date.getFullYear()}-${(date.getMonth() + 1)
            .toString()
            .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${roundedMinutes.toString().padStart(2, '0')}`;
        groupedByTime[timeLabel] = (groupedByTime[timeLabel] || 0) + 1;
    });

    const counts = Object.values(groupedByTime);
    const mean = counts.reduce((a, b) => a + b, 0) / counts.length;
    const stdDev = Math.sqrt(counts.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / counts.length);
    const zThreshold = 1.5;

    Object.entries(groupedByTime).forEach(([time, count]) => {
        const zScore = stdDev === 0 ? 0 : (count - mean) / stdDev;
        if (zScore > zThreshold) {
            const [year, month, day, hour, minute] = time.split(/[- :]/);
            const startTime = new Date(year, month - 1, day, hour, minute);
            const endTime = new Date(startTime);
            endTime.setMinutes(endTime.getMinutes() + fraudIntervalMinutes);
            fraudAlerts.push({
                startTime: startTime.toLocaleString(),
                endTime: endTime.toLocaleString(),
                count,
                zScore: zScore.toFixed(2)
            });
        }
    });

    const votersSheet = [["Опция", "Имя", "Email"]];
    vote.options.forEach(option => {
        (votersByOption[option.option_text] || []).forEach(voterStr => {
            const [namePart, emailPart] = voterStr.split(" (");
            const email = emailPart?.replace(")", "");
            votersSheet.push([option.option_text, namePart, email]);
        });
    });

    const distributionSheet = [["Опция", "Голоса"]];
    pieData.forEach(d => distributionSheet.push([d.name, d.value]));

    const timeSeriesSheet = [["Время", "Голоса"]];
    timeData.forEach(d => timeSeriesSheet.push([d.time, d.count]));

    const fraudSheet = [["Начало", "Конец", "Голоса", "Z"]];
    fraudAlerts.forEach(f => fraudSheet.push([f.startTime, f.endTime, f.count, f.zScore]));

    const sheets = [
        { title: "Проголосовавшие", data: votersSheet },
        { title: "Распределение", data: distributionSheet },
        { title: "Динамика", data: timeSeriesSheet },
        { title: "Накрутка", data: fraudSheet }
    ];

    if (fileType === "pdf") {
        const doc = new jsPDF("p", "mm", "a4");
        doc.addFileToVFS("Nunito-Regular.ttf", nunitoFont);
        doc.addFont("Nunito-Regular.ttf", "Nunito", "normal");
        doc.setFont("Nunito");
        doc.setFontSize(16);

        let y = 10;
        doc.text("Отчёт по голосованию", 105, y, { align: "center" });
        y += 10;

        if (pieImage) {
            doc.setFontSize(12).text("Распределение голосов:", 10, y);
            y += 5;
            doc.addImage(pieImage, "PNG", 10, y, 90, 60);
            y += 65;
        }

        if (lineImage) {
            doc.text("Динамика голосов:", 10, y);
            y += 5;
            doc.addImage(lineImage, "PNG", 10, y, 180, 60);
            y += 70;
        }

        doc.text("Проверка на накрутку:", 10, y);
        y += 5;

        if (fraudAlerts.length === 0) {
            doc.text("Нет подозрительной активности.", 10, y);
            y += 10;
        } else {
            fraudAlerts.forEach(f => {
                doc.text(`• ${f.startTime} — ${f.endTime}: ${f.count} голосов (Z=${f.zScore})`, 10, y);
                y += 7;
                if (y > 280) { doc.addPage(); y = 10; }
            });
        }

        doc.setFontSize(12).text("Список проголосовавших:", 10, y);
        y += 6;

        vote.options.forEach(opt => {
            doc.setFont("Nunito", "normal");
            doc.text(`• ${opt.option_text}`, 10, y);
            y += 5;

            doc.setFont("Nunito", "normal");
            (votersByOption[opt.option_text] || []).forEach(voter => {
                doc.text(`   - ${voter}`, 12, y);
                y += 5;
                if (y > 280) {
                    doc.addPage();
                    y = 10;
                    doc.setFont("Nunito", "normal");
                }
            });
        });

        doc.save(`vote-report-${vote.id}.pdf`);

    } else if (fileType === "xlsx") {
        const wb = XLSX.utils.book_new();
        sheets.forEach(({ title, data }) => {
            const ws = XLSX.utils.aoa_to_sheet(data);
            XLSX.utils.book_append_sheet(wb, ws, title);
        });
        XLSX.writeFile(wb, `vote-report-${vote.id}.xlsx`);

    } else if (fileType === "csv") {
        exportCSV(vote, sheets);
    }
};