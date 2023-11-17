import React from 'react';
import domtoimage from 'dom-to-image';

const TimetableComponent = ({ timetables }) => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const hours = [1, 2, 3, 4, 5, 6, 7]; // Assuming there are 7 hours in a day

    const getCellValue = (day, hour) => {
        const timetableEntry = timetables[0].timetable.find(
            (entry) => entry.day === days[day] && entry.hour === hour.toString()
        );

        return timetableEntry ? timetableEntry.subject : '';
    };

    function download(className) {
        const element = document.getElementById(`classtt-${className}`);

        if (element) {
            domtoimage.toJpeg(element, { quality: 0.95 })
                .then(function (dataUrl) {
                    var link = document.createElement('a');
                    link.download = `Timetable_${className}.jpeg`; // Use className in the file name
                    link.href = dataUrl;
                    link.click();
                })
                .catch(function (error) {
                    console.error('Error generating image:', error);
                });
        } else {
            console.error(`Element with id "classtt-${className}" not found.`);
        }
    }

    return (
        <div >
            {timetables.map((timetable, index) => (
                <div key={index} className='classtt' id={`classtt-${String(timetable.className)}`}>
                    <h3>{String(timetable.className)}</h3>
                    <table id={`table-${String(timetable.className)}`}>
                        <thead>
                            <tr>
                                <th>Day/Period</th>
                                {hours.map((hour) => (
                                    <th key={hour}>Hour {hour}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {days.map((day, dayIndex) => (
                                <tr key={dayIndex}>
                                    <th>{day}</th>
                                    {hours.map((hour) => (
                                        <td key={`${dayIndex}-${hour}`}>
                                            {getCellValue(dayIndex, hour)}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className='view'>
                        <div onClick={() => download(String(timetable.className))} className='v1' style={{ width: 'fitContent' }}>
                            View More
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TimetableComponent;
