const PI2 = Math.PI * 2;

const COLORS = [
    '#c380ff',
    '#ab95ff',
    '#9ca1ff',
    '#7cbcff',
    '#61d3ff',
    '#49e8ff',
    '#71cffb',
    '#95b8f7',
    '#baa1f3',
    '#db8def',
    '#ff76eb',
    '#cf7efb'
]

export class Polygon {
    //x, y: 폴리곤 위치, radius: 직경 , sides: 점 개수
    constructor(x, y, radius, sides){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.sides = sides;
        this.rotate = 0;
    }

    animate(ctx, moveX){
        ctx.save();
        //ctx.fillStyle = '#000';
        //ctx.beginPath();

        const angle = PI2 / this.sides;
        const angle2 = PI2 / 4;

        ctx.translate(this.x, this.y);

        this.rotate += moveX * 0.008;
        ctx.rotate(this.rotate);

        for(let i = 0; i<this.sides; i++){
            const x = this.radius * Math.cos(angle * i);
            const y = this.radius * Math.sin(angle * i);

            //(i ==0) ? ctx.moveTo(x, y) : ctx.lineTo(x, y);

            ctx.save();
            ctx.fillStyle = COLORS[i];
            ctx.translate(x,y);
            ctx.rotate(((360 / this.sides) * i + 45) * Math.PI / 180);
            ctx.beginPath();
            for(let j = 0; j < 4; j++){
                const x2 = 160 * Math.cos(angle2 * j);
                const y2 = 160 * Math.sin(angle2 * j);
                (j == 0) ? ctx.moveTo(x2, y2) : ctx.lineTo(x2, y2);
            }
            ctx.fill();
            ctx.closePath();
            ctx.restore();
        }

        //ctx.fill();
        //ctx.closePath();
        ctx.restore();
    }
}