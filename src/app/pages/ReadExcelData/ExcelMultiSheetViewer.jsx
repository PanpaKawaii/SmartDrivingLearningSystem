import { useState } from 'react';
import ExcelJS from 'exceljs';

export default function ExcelMultiSheetViewer() {
    const [sheetsData, setSheetsData] = useState({});

    const handleFile = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const workbook = new ExcelJS.Workbook();
        const buffer = await file.arrayBuffer();

        await workbook.xlsx.load(buffer);

        const result = {};

        // duyệt tất cả sheet
        workbook.worksheets.forEach((sheet) => {
            const sheetName = sheet.name;

            let headers = [];
            const data = [];

            sheet.eachRow((row, rowIndex) => {
                const values = row.values;

                if (rowIndex === 1) {
                    headers = values.slice(1);
                } else {
                    const obj = {};

                    headers.forEach((header, index) => {
                        obj[header] = values[index + 1] ?? '';
                    });

                    data.push(obj);
                }
            });

            result[sheetName] = data;
        });

        setSheetsData(result);
    };

    return (
        <div style={{ color: '#000', padding: 20 }}>
            <input type='file' accept='.xlsx' onChange={handleFile} />
            <div style={{ marginTop: 20 }}>
                {Object.entries(sheetsData).map(([sheetName, data]) => (
                    <div key={sheetName} style={{ marginBottom: 20 }}>
                        <div style={{ display: 'flex', alignItems: 'end', gap: '20px', marginBottom: '12px' }}>
                            <h3>{sheetName}</h3>
                            <button onClick={() => navigator.clipboard.writeText(JSON.stringify(data))}>Copy</button>
                        </div>
                        <textarea
                            value={JSON.stringify(data, null, 2)}
                            readOnly
                            style={{
                                width: '100%',
                                height: '200px',
                                resize: 'none',
                                fontFamily: 'monospace'
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}