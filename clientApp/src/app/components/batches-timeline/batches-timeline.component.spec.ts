import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchesTimelineComponent } from './batches-timeline.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppMaterialModule } from '../../material.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BatchesTimelineFilterComponent } from '../batches-timeline-filter/batches-timeline-filter.component';

describe('BatchesTimelineComponent', () => {
  let component: BatchesTimelineComponent;
  let fixture: ComponentFixture<BatchesTimelineComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          AppMaterialModule,
          ReactiveFormsModule,
          FormsModule,
          HttpClientTestingModule,
          BrowserAnimationsModule
        ],
        declarations: [BatchesTimelineComponent, BatchesTimelineFilterComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchesTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the today line', () => {
    component.updateTodayLine();
    expect(component.todayLine.x1).not.toBeNull();
    expect(component.todayLine.x2).not.toBeNull();
    expect(component.todayLine.y1).not.toBeNull();
    expect(component.todayLine.y2).not.toBeNull();
  });

  it('should return the rectangles for the batches', () => {
    const rects = component.getBatchesRectangles();
    expect(rects.length).toEqual(component.batches.length);
  });

  it('should return the list of swimlane lines', () => {
    expect(component.getSwimlanes().length).toEqual(component.trainers.length + 1);
  });

  it('should set the list of trainers', () => {
    component.updateTrainers();
    expect(component.trainers).toBeTruthy();
    expect(component.trainers.length).toBeGreaterThan(0);
  });

  it('should return the list of trainers with positions', () => {
    const trainers = component.getTrainers();
    expect(trainers.length).toEqual(component.trainers.length);
    expect(trainers[0].name).toBeTruthy();
    expect(trainers[0].left).toBeTruthy();
    expect(trainers[0].width).toBeTruthy();
  });

  it('should get a different color for each core curriculum', () => {
    const jcolor = component.getColorForcurriculum(1);
    const scolor = component.getColorForcurriculum(2);
    const dcolor = component.getColorForcurriculum(3);
    const ccolor = component.getColorForcurriculum(4);
    expect(jcolor).not.toEqual(scolor);
    expect(jcolor).not.toEqual(dcolor);
    expect(jcolor).not.toEqual(ccolor);
    expect(scolor).not.toEqual(dcolor);
    expect(scolor).not.toEqual(ccolor);
    expect(dcolor).not.toEqual(ccolor);
  });

  it('should return a list of months and their position', () => {
    const months = component.getTimescale();
    expect(months.length).toBeGreaterThan(1);
  });

  it('should zoom the page', () => {
    const prezoom = component.endDate.valueOf() - component.startDate.valueOf();
    const zoomFactor = 2;
    component.startZoom(100);
    component.zoomBy(zoomFactor);
    component.finishZoom();
    expect(component.endDate.valueOf() - component.startDate.valueOf()).toEqual(zoomFactor * prezoom);
  });

  it('should set the tooltip', () => {
    component.updateTooltip(0, { x: 1, y: 1 });
    // todo more testing here
    expect(component.tooltipRect.x < 0);
  });
});
