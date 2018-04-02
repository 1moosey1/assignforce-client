import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Batch } from '../../model/batch';

@Component({
  selector: 'app-batches-timeline',
  templateUrl: './batches-timeline.component.html',
  styleUrls: ['./batches-timeline.component.css']
})
export class BatchesTimelineComponent implements OnInit {
  // todo make responsive
  // todo use mask
  // values from current site
  width = 1536;
  height = 2067;

  // test data
  batches = [
    {
      name: 'Feb02-18',
      curriculum: 'Java',
      focus: 'none',
      startDate: new Date(2018, 1, 5),
      endDate: new Date(2018, 4, 29),
      trainer: 'August Duet',
      cotrainer: 'Mitch',
      location: 'Viginia',
      building: '1',
      room: '101'
    },
    {
      name: 'WWWWWWW',
      curriculum: 'Custom',
      focus: 'none',
      startDate: new Date(2018, 3, 12),
      endDate: new Date(2018, 7, 29),
      trainer: 'TEST longtrainername here',
      cotrainer: null,
      location: 'Viginia',
      building: null,
      room: null
    },
    {
      name: 'AAA',
      curriculum: '.NET',
      focus: 'none',
      startDate: new Date(2018, 0, 1),
      endDate: new Date(2018, 0, 8),
      trainer: 'TEST longtrainername here',
      cotrainer: null,
      location: null,
      building: null,
      room: null
    },
    {
      name: 'Feb03-16',
      curriculum: 'Java',
      focus: 'none',
      startDate: new Date(2016, 2, 5),
      endDate: new Date(2016, 4, 29),
      trainer: 'August',
      cotrainer: 'Mitch',
      location: 'Viginia',
      building: '1',
      room: '101'
    },
    {
      name: 'Feb02-17',
      curriculum: 'Java',
      focus: 'none',
      startDate: new Date(2017, 2, 5),
      endDate: new Date(2017, 4, 29),
      trainer: 'Emily',
      cotrainer: 'Mitch',
      location: 'Viginia',
      building: '1',
      room: '101'
    },
    {
      name: 'Jun06-18',
      curriculum: 'Java',
      focus: 'none',
      startDate: new Date(2018, 6, 20),
      endDate: new Date(2018, 8, 29),
      trainer: 'August',
      cotrainer: 'Mitch',
      location: 'Viginia',
      building: '1',
      room: '101'
    }
  ];

  // root element of the timeline. used for getting the relative mouse position
  @ViewChild('timelineroot') timelineRootElement: ElementRef;

  // default values for formatting
  column_width = 50;
  swimlane_x_ofs = 80;
  swimlane_y_ofs = 20;
  months = [];

  // editable data
  startDate: Date;
  endDate: Date;
  trainers_per_page = 0;

  // zooming
  zooming = false;
  zoomingFrom: number;
  zoomingFromDate: number;
  zoomingLine = { x1: 0, x2: 0, y1: 0, y2: 0 };
  preZoomBeforeDuration: number;
  preZoomAfterDuration: number;
  zoomScale = 0.01; // px to zoom scale

  // popup

  // generated data
  trainers = [];
  today_line = { x1: 0, x2: 0, y1: 0, y2: 0 };

  constructor() {}

  // initialize data
  ngOnInit() {
    // todo get values from batches timeline component instead
    if (this.trainers_per_page === 0) {
      this.trainers_per_page = this.batches.length;
    }
    // set start date to 3 months ago
    const today = new Date(Date.now());
    console.log(today.getMonth());
    this.startDate = new Date(today);
    this.startDate.setMonth(this.startDate.getMonth() - 3);
    // set end date to 6 months ago
    this.endDate = new Date(today);
    this.endDate.setMonth(this.endDate.getMonth() + 6);

    this.updateTrainers();
    this.updateTodayLine();
  }

  // this is called when any of the filters are changed
  onFilterChange(evt) {
    console.log(evt);
    // todo update stuff
  }

  // makes the list of trainers
  updateTrainers() {
    this.trainers = [];
    // add all unique trainers found in the batches
    for (let i = 0; i < this.batches.length; i++) {
      const batch = this.batches[i];
      const trainer = batch.trainer;
      if (!this.trainers.includes(trainer)) {
        this.trainers.push(trainer);
      }
    }
  }

  // updates the line for today
  updateTodayLine() {
    // calculate position of today_line
    const y =
      (new Date(Date.now()).valueOf() - this.startDate.valueOf()) /
      (this.endDate.valueOf() - this.startDate.valueOf()) *
      this.height;
    this.today_line = { x1: 0, x2: this.width, y1: y, y2: y };
  }

  // returns the appropriate color for the core curriculum type
  getColorForcurriculum(type) {
    let color = '';
    switch (type.toLowerCase()) {
      case 'java':
        color = '#1c77b4'; //java
        break;
      case '.net':
        color = '#ff7f0e'; //.net
        break;
      case 'sdet':
        color = '#aec7e8'; //sdet
        break;
      default:
        color = '#ffbb78'; //custom
        break;
    }
    return color;
  }

  // returns the list of rectangles that represent each batch
  getBatchesRectangles() {
    const rects = [];
    const full_duration = this.endDate.valueOf() - this.startDate.valueOf();
    // make a rectangle for each batch
    for (let i = 0; i < this.batches.length; i++) {
      const batch = this.batches[i];
      // valueOf gives us ms, convert to weeks to get the duration this event takes
      let duration = batch.endDate.valueOf() - batch.startDate.valueOf();
      duration = Math.floor(duration / (1000 * 60 * 60 * 24 * 7)); // ms to weeks

      // get the correct color
      const color = this.getColorForcurriculum(batch.curriculum);

      // get the column this batch will be in
      const trainer_index = this.trainers.findIndex(t => t === batch.trainer);

      // todo set width dynamically
      const w = 20;

      // get the top left position of the rectangle
      const x = this.swimlane_x_ofs + trainer_index * this.column_width + (this.column_width - w) * 0.5;
      const y = (batch.startDate.valueOf() - this.startDate.valueOf()) / full_duration * this.height;
      // calculate height from the top and bottom of the rectangle
      const endy = (batch.endDate.valueOf() - this.startDate.valueOf()) / full_duration * this.height;
      const h = endy - y;
      // get the text that will be put into the rectangle
      const durarray = duration
        .toString()
        .split(' ')
        .concat('WEEKS'.split(''));
      //console.log('batch ' + batch.name + '\n rect: ' + ' x:' + x + ' y:' + y + ' h:' + h);
      rects.push({ x: x, y: y, w: w, h: h, dur: durarray, color: color });
    }
    return rects;
  }

  // returns a list of the lines that seperate columns
  getSwimlanes() {
    const lines = [];
    // make 1 more swimlane than the amount of trainers
    for (let i = 0; i < this.trainers.length + 1; i++) {
      const xpos = this.swimlane_x_ofs + i * this.column_width;
      lines.push({ x1: xpos, y1: this.swimlane_y_ofs, x2: xpos, y2: this.height - this.swimlane_y_ofs });
    }
    return lines;
  }

  // returns the list of trainers with their positions
  getTrainers() {
    const trainerposs = [];
    for (let i = 0; i < this.trainers.length; i++) {
      // get trainer name
      const trainer = this.trainers[i];
      // get left offset of this trainer
      let left = 2;
      if (i === 0) {
        left += this.swimlane_x_ofs;
      }
      // get width
      const width = this.column_width - 2;
      trainerposs.push({ name: trainer, left: left, width: width });
    }
    return trainerposs;
  }

  // returns the list of months to display and their position
  getTimescale() {
    // cache some common values
    const full_duration = this.endDate.valueOf() - this.startDate.valueOf();
    const start_month = this.startDate.getMonth();
    const start_year = this.startDate.getFullYear();

    // get distance between months (px) to determine which scale to use
    const ys0 = (new Date(start_year, start_month).valueOf() - this.startDate.valueOf()) / full_duration * this.height;
    const ys1 =
      (new Date(start_year, start_month + 1).valueOf() - this.startDate.valueOf()) / full_duration * this.height;
    const dist_between_months = ys1 - ys0;
    // console.log(dist_between_months);

    // number of dates to be shown on the screen
    // const numDates = dist_between_months / this.height + 1;
    const num_dates = 30; //todo based on height
    // console.log("showing "+num_dates+" num dates");

    // min value for dist_between_months to be for that scale
    // numbers magically determined from trial and error
    const pxdays = 1900;
    const px2days = 800;
    const pxweeks = 300;
    const pxmonths = 100;
    const pxquarters = 30;
    const pxyears = 6;
    const px2years = 2;
    const px5years = 1;
    const px10years = 0;

    // create an array of all the dates to be shown and determine the naming style
    const dates: Date[] = [];
    let namestyle = 'month';
    if (dist_between_months > pxdays) {
      // show in days
      namestyle = 'day';
      for (let i = 0; i < num_dates; i++) {
        dates.push(new Date(start_year, start_month, this.startDate.getDate() + i));
      }
      // console.log('day');
    } else if (dist_between_months > px2days) {
      // show in 2 days
      namestyle = 'day';
      const aligned_start_date_2 = this.startDate.getDate() - this.startDate.getDate() % 2;
      for (let i = 0; i < num_dates; i++) {
        dates.push(new Date(start_year, start_month, aligned_start_date_2 + i * 2));
      }
      // console.log('2day');
    } else if (dist_between_months > pxweeks) {
      // show in weeks
      namestyle = 'month';
      // todo always show month day 0 and year month 0
      const aligned_start_date = this.startDate.getDate() - this.startDate.getDate() % 7;
      for (let i = 0; i < num_dates; i++) {
        dates.push(new Date(start_year, start_month, i * 7));
      }
      // console.log('week');
    } else if (dist_between_months > pxmonths) {
      // show in months
      namestyle = 'month';
      for (let i = 0; i < num_dates; i++) {
        dates.push(new Date(start_year, start_month + i));
      }
      // console.log('mnth');
    } else if (dist_between_months > pxquarters) {
      // show in quarters
      namestyle = 'month';
      for (let i = 0; i < num_dates; i++) {
        dates.push(new Date(start_year, i * 3));
      }
      // console.log('qtr');
    } else if (dist_between_months > pxyears) {
      // show in years
      namestyle = 'year';
      for (let i = 0; i < num_dates; i++) {
        dates.push(new Date(start_year + i, 0));
      }
      // console.log('yr');
    } else if (dist_between_months > px2years) {
      // show in 2 years
      namestyle = 'year';
      const aligned_start_year = start_year - start_year % 2;
      for (let i = 0; i < num_dates; i++) {
        dates.push(new Date(aligned_start_year + i * 2, 0));
      }
      // console.log('2yr');
    } else if (dist_between_months > px5years) {
      // show in 5 years
      namestyle = 'year';
      const aligned_start_year = start_year - start_year % 5;
      for (let i = 0; i < num_dates; i++) {
        dates.push(new Date(aligned_start_year + i * 5, 0));
      }
      // console.log('5yr');
    } else if (dist_between_months > px10years) {
      // show in 10 years
      namestyle = 'year';
      const aligned_start_year = start_year - start_year % 10;
      for (let i = 0; i < num_dates; i++) {
        dates.push(new Date(aligned_start_year + i * 10, 0));
      }
      // console.log('10yr');
    } else {
      console.log('getTimescale failed to determine scale');
      return null;
    }

    // used to show names instead of numbers
    const fullMonthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
    const shortMonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dayOfWeekNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];

    // go through all the dates that were just created to apply the naming style and calculate the position
    const timescale = [];
    for (let i = 0; i < dates.length; i++) {
      const date = dates[i];
      // apply naming style - day, month, or year
      let name = 'name ' + i;
      switch (namestyle) {
        case 'day':
          if (date.getDate() === 1) {
            name = fullMonthNames[date.getMonth()];
          } else {
            name = dayOfWeekNames[date.getDay()];
            name += ' ' + date.getDate();
          }
          break;
        case 'month':
          if (date.getDate() === 1) {
            name = fullMonthNames[date.getMonth()];
          } else {
            name = shortMonthNames[date.getMonth()];
            name += ' ' + date.getDate();
          }
          break;
        case 'year':
          name = '' + date.getFullYear();
          break;
      }
      // replace jan 0 with the year
      if (date.getMonth() === 0 && date.getDate() === 1) {
        name = '' + date.getFullYear();
      }
      // calculate the position of the text
      const y = this.swimlane_y_ofs + (date.valueOf() - this.startDate.valueOf()) / full_duration * this.height;
      const x = this.swimlane_x_ofs - 5;
      timescale.push({ name: name, x: x, y: y });
    }
    return timescale;
  }

  startZoom(mouseposy) {
    // calculate values needed for zooming from the mousepos
    this.zoomingFrom = mouseposy;
    this.zoomingLine = { x1: 0, x2: this.width, y1: mouseposy, y2: mouseposy };
    // position (px) to date
    this.zoomingFromDate =
      mouseposy / this.height * (this.endDate.valueOf() - this.startDate.valueOf()) + this.startDate.valueOf();
    // get duration before and after zoom line
    // console.log(new Date(this.zoomingFromDate));
    this.preZoomBeforeDuration = this.zoomingFromDate - this.startDate.valueOf();
    this.preZoomAfterDuration = this.endDate.valueOf() - this.zoomingFromDate;
    this.zooming = true;
  }

  zoomBy(amount) {
    // must be zooming to zoom
    if (!this.zooming) {
      return;
    }
    // scale the durations before and after the zoom line
    const newBeforeDuration = this.preZoomBeforeDuration * amount;
    const newStart = this.zoomingFromDate - newBeforeDuration;
    const newAfterDuration = this.preZoomAfterDuration * amount;
    const newEnd = this.zoomingFromDate + newAfterDuration;
    // console.log(new Date(newStart) + ', ' + new Date(this.endDate));
    if (newStart >= newEnd) {
      console.log('start date is after end date!');
      return;
    }
    // set start and end dates
    this.startDate = new Date(newStart);
    this.endDate = new Date(newEnd);
    this.updateTodayLine();
  }

  finishZoom() {
    // todo undo support?
    this.zooming = false;
  }

  // start zoom at mouse pos on mousedown
  bgmousedown(event) {
    const mousey = event.clientY - this.timelineRootElement.nativeElement.getBoundingClientRect().top;
    this.startZoom(mousey);
  }
  // finish zoom on mouseup
  bgmouseup(event) {
    this.finishZoom();
  }
  // hide popup and update zoom by delta on mouse move
  bgmousemove(event) {
    if (this.zooming) {
      // stop zooming if mouse is up (happens when mouse is released outside of the timeline and returns)
      if (event.buttons !== 1) {
        this.finishZoom();
      }
      // get the factor to zoom by from the relative mouse position
      const y = event.clientY - this.timelineRootElement.nativeElement.getBoundingClientRect().top;
      const dy = y - this.zoomingFrom;
      let zoomFactor = dy * this.zoomScale;
      zoomFactor = Math.pow(2, zoomFactor);
      // console.log('zf ' + zoomFactor);
      this.zoomBy(zoomFactor);
    }
    // todo disable popup if mouse has not moved over a batch rectangle recently
  }

  // show tooltip at mouse on mouse move on batch
  batchmousemove(event) {
    // todo
  }
}
