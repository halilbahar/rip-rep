import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorGeneratorService {

  constructor() {
  }

  getColor(amount = 1): string | string[] {
    const colors = [];

    for (let i = 0; i < amount; i++) {

      colors.push(this.hsl2hex(
        Math.round(Math.random() * 360),
        Math.round(80 - Math.random() * 10) / 100,
        Math.round(90 - Math.random() * 10) / 100
      ));
    }

    console.log(colors);

    if (colors.length === 1) {
      return colors[0];
    }

    return colors;
  }

  private hsl2hex(h: number, s: number, l: number): string {
    console.log(`${h},${s},${l}`);
    const a = s * Math.min(l, 1 - l);
    const f = (n: number, k: number = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return '#' + [f(0), f(8), f(4)].map(x => Math.round(x * 255).toString(16).padStart(2, '0')).join('');
  }
}
