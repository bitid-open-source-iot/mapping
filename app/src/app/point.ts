export class MapPointIcon {

    public url: string = '';
    
    constructor(point: number) {
        const canvas        = document.createElement('canvas');
        canvas.width        = 60;
        canvas.height       = 70;
        const context       = canvas.getContext('2d');

        context.beginPath();
        
        context.ellipse(30, 30, 30, 30, 0, 0, 2 * Math.PI);
        context.fillStyle = '#FFFFFF';
        context.fill();

        context.closePath();

        context.beginPath();

        context.moveTo(30, 70);
        context.lineTo(7.5, 49.8);
        context.lineTo(52.5, 49.8);

        context.closePath();

        context.fillStyle = '#FFFFFF';
        context.fill();

        context.beginPath();
        
        context.ellipse(30, 30, 25, 25, 0, 0, 2 * Math.PI);
        context.fillStyle = '#FFFFFF';
        context.fill();
        context.clip();

        context.font            = '24px Arial';
        context.fillStyle       = '#000000';
        context.textAlign       = 'center';
        context.textBaseline    = 'middle';
        context.fillText(JSON.stringify(point), 30, 30);
        
        this.url = canvas.toDataURL();
    };

}