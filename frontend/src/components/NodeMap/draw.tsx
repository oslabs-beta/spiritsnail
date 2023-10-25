import { Circle, Line } from '../../types';

// Function to draw circle on canvas
const drawCircle = (canvasContext, circle) => {
    canvasContext.beginPath();
    canvasContext.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
    canvasContext.fillStyle = 'black';
    canvasContext.fill();
    canvasContext.closePath();
};

// Function to draw line between circles
const drawLine = (canvasContext, circleA, circleB) => {
    canvasContext.beginPath();
    canvasContext.moveTo(circleA.x, circleA.y);
    canvasContext.lineTo(circleB.x, circleB.y);
    canvasContext.strokeStyle = 'dark-gray';
    canvasContext.lineWidth = 2;
    canvasContext.stroke();
};

export const draw = (canvasContext, canvas, circles:Circle[], lines:Line[]):void | null => {
    // console.log('draw')
    // clear canvas
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);

    console.log('lines in draw', lines);
    // Draw lines with labels
    lines.forEach(line => {
        console.log('line', line);
        // console.log('Check here', circles.find(circle => circle.name === line.from)) 
        console.log('testing', circles.find(circle => circle.name === line.from))
        const fromCircle: Circle = circles.find(circle => circle.name === line.from);
        const toCircle: Circle = circles.find(circle => circle.name === line.to);
        console.log('from', fromCircle, '  to', toCircle);
        // Draw line
        drawLine(canvasContext, fromCircle, toCircle);

    // Calculate the midpoint of the line for label positioning
    const labelX = (fromCircle.x + toCircle.x) / 2;
    const labelY = (fromCircle.y + toCircle.y) / 2;

        // Display label
        canvasContext.font = '12px Arial';
        canvasContext.fillStyle = 'red';
        canvasContext.fillText(`average latency: ${line.latency}ms requests:${line.requests}`, labelX, labelY);
    });

    // Draw circles and node labels
    circles.forEach(circle => {
        // call helper func
        drawCircle(canvasContext, circle);
        // Display trace data on the circle
        // needs to be reconfigured w/ store
        canvasContext.font = '12px Arial';
        canvasContext.fillStyle = 'white';
        canvasContext.fillText(circle.name, circle.x - 15, circle.y);
    });
};