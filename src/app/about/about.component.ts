import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {concat, fromEvent, interval, noop, observable, Observable, of, timer, merge, Subject} from 'rxjs';
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
       * And in those situations we can resort to the use of a subject
       * as subject is at the same time an observer and an observable
       * Let's create a new subject. We are going to define here a
       * variable called subject and we are going to assign it a new
       * subject that we are going to instantiate.
       */

      const subject = new Subject();

      /**
       * We can directly emit values with it, but we can also combine
       * it with other observables, although we could use a subject
       * here as a public member variable, for example, of this component
       * and share it directly with other components of the application.
       * That is usually not a good idea.
       * The subject is meant to be private to the part of the application
       * that is emitting a given set of data, the same way that here
       * in our HTTP observable, we wouldn't want other parts of the
       * program to get access here to this observer.
       * Only this part of the program can emit errors,
       * complete the observable or emit the backend response.
       * It would not be a very good idea to share this observer outside
       * of this method.
       */
      const series$ = subject.asObservable();

      series$.subscribe(console.log);

      subject.next(1);
      subject.next(2);
      subject.next(3);
      subject.complete();

      /**
       * We don't have any way of providing unsubscribe logic to our
       * observable that gets derived here from this subject.
       *
       * And we also run the risk of sharing accidentally the subject
       * with other parts of the application, which means that those
       * other parts of the application could potentially take over the
       * behavior of the observable by directly calling the next complete
       * or error on the subject, which is not intended by this reason,
       */

      /**
       * we should try to use subjects as little as possible.
       * Instead, we should try to derive our observables directly
       * from the source as much as possible, using methods such as,
       * for example, from promise to derive an observable from a promise
       * or simply the from method that allows us to derive an observable
       * directly from a browser event, for example.
       *  So these are the preferred ways for creating our own observable
       * by using these arrogates utility methods.
       *
       * from(document, 'keyup')
       */

      /**
       * However, if by some reason that is not practical or even possible,
       * then using a subject is a great way of creating a custom observable
       * notice that another very common use case for our subjects is a
       * multicasting. In the case of multicasting, we want to take one value
       * from one observable stream and remit that into multiple separate
       * output streams. As we will see, the notion of subject is going
       * to be essential for us to implement our own custom store solution.
       */
    }


}






