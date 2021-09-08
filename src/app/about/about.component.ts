import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {concat, fromEvent, interval, noop, observable, Observable, of, timer, merge, Subject, BehaviorSubject, AsyncSubject, ReplaySubject} from 'rxjs';
import {delayWhen, filter, map, take, timeout} from 'rxjs/operators';
import {createHttpObservable} from '../common/util';


@Component({
    selector: 'about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  ngOnInit() {

    /**
     * In this lesson, we're going to talk about two new types of subjects.
     *  async subjects and replace subjects.
     * The async subject is a deal for using with long running calculations
     * where we have here and observable that is emitting here a lot of
     * intermediate calculation values.


Let's say that the calculation is ongoing and we are progressively reporting here the latest most up

to date value of that calculation.

But the calculation has not finished yet.

When the calculation is finished, then the less the value of the subject is going to be emitted and

then the subject is going to be completed in this scenario.

We really don't want to receive the intermediate values of the calculation.

Instead, what we would like to receive is the last value that got emitted just before completion.

So that's the final value of the calculation.

In order to implement that use case, we can use the async subject from our SJS async subject will wait

for observable completion before emitting any of the values to the multiple subscribers.

The value emitted is going to be the last value.
     */

      // const subject = new BehaviorSubject(0);
      // const series$ = subject.asObservable();
      // series$.subscribe(val => console.log("early subject " + val));

      // subject.next(1);
      // subject.next(2);
      // subject.next(3);

      // subject.complete();

      const subject = new AsyncSubject();
      const series$ = subject.asObservable();
      series$.subscribe(val => console.log("early subject " + val));

      subject.next(1);
      subject.next(2);
      subject.next(3);
    subject.complete();

    // subject.complete();
    // And notice that if we comment out here the
    // completion of the subject, we are going to see that no value
    // So completion is essential before emitting
    // the final result of the long running calculation.

    setTimeout(() => {
      series1$.subscribe(val => console.log("second subscrber " + val));
    }, 3000);
    /**
     * output is first sub: 3, second sub: 3
     */

  /**
   * REPLAY SUBJECt
   */

   const subject1 = new ReplaySubject();
   const series1$ = subject1.asObservable();
   series1$.subscribe(val => console.log("ReplaySubject early subject " + val));

   subject1.next(100);
   subject1.next(200);
   subject1.next(300);
  //  subject.complete();


  setTimeout(() => {
    series1$.subscribe(val => console.log("ReplaySubject subscrber " + val));
    subject1.next(400);
  }, 3000);

      }

  /**
   * So in order to enable that, we can use instead of the Asyncsubject,
   * the replay subject, the replaced subject, like the name suggests,
   * is going to replay the complete observable to all lead subscribers
   * and notice that this logic is not linked to observable completion.
   * So we don't have to wait for the Observer to complete four late
   * subscribers to have all the values replayed the back to them after
   * the second subscription if a new value gets submitted.
   * Let's say that we emit here volume number four.
   * Then this value is going to be broadcasted to both subscribers,
   * just like the case of a normal subject.
   * So as you can see, after the emission of volume number for the
   * first subscriber and the second subscriber received this new value.
   */


  }






