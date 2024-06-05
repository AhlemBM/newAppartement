import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-circle-progress',
  template: `
    <svg [attr.width]="2 * radius" [attr.height]="2 * radius">
      <circle
        [attr.cx]="radius"
        [attr.cy]="radius"
        [attr.r]="radius - outerStrokeWidth / 2"
        [attr.stroke]="outerStrokeColor"
        [attr.stroke-width]="outerStrokeWidth"
        fill="none"
      ></circle>
      <circle
        [attr.cx]="radius"
        [attr.cy]="radius"
        [attr.r]="radius - innerStrokeWidth / 2"
        [attr.stroke]="innerStrokeColor"
        [attr.stroke-width]="innerStrokeWidth"
        fill="none"
        [attr.stroke-dasharray]="circumference"
        [attr.stroke-dashoffset]="circumference * (1 - percent / 100)"
      ></circle>
    </svg>
  `,
  styleUrls: ['./circle-progress.component.css']
})
export class CircleProgressComponent {
  @Input() percent: number = 0;
  @Input() radius: number = 50;
  @Input() outerStrokeWidth: number = 10;
  @Input() innerStrokeWidth: number = 5;
  @Input() outerStrokeColor: string = '#000';
  @Input() innerStrokeColor: string = '#000';

  get circumference(): number {
    return 2 * Math.PI * (this.radius - this.outerStrokeWidth / 2);
  }
}
