import {Observable} from 'rxjs';


export function createHttpObservable(url: string) {
  /**
   * So here in our HTP observable, we have here a very clear
   * separation between the observable that is getting returned here
   * by the Create Method and the Observer, which is this parameter
   * here that allows us to either emit a new value using next or
   * complete or error out the observable in this way of creating
   * observables. There is a very clear separation between the observable
   * and the observer, but there are many situations where this is not a
   * very convenient way of creating an observable. And in those situations
   * we can resort to the use of a subject as subject is at the same time
   * an observer and an observable let's switch here to the about
   * component and quickly create a new subject. We are going to define
   * here a variable called subject and we are going to assign it a
   * new subject that we are going to instantiate.
   */
    return Observable.create(observer => {

        const controller = new AbortController();
        const signal = controller.signal;

        fetch(url, {signal})
            .then(response => {

                if (response.ok) {
                    return response.json();
                }
                else {
                    observer.error('Request failed with status code: ' + response.status);
                }
            })
            .then(body => {

                observer.next(body);

                observer.complete();

            })
            .catch(err => {

                observer.error(err);

            });

        return () => controller.abort()


    });
}


/**
 *  if some of those methods are not convenient or if we run into
 * a source of data that is not easily transformable into an observable,
 * or if we are doing the multicasting of one value to multiple
 * separate observable consumers, then we might want to look into
 * the notion of subject. So here in our HTP observable,
 * we have here a very clear separation between the observable that is
 * getting returned here by the Create Method and the Observer,
 * which is this parameter here that allows us to either emit a new
 * value using next or complete or error out the observable in this
 * way of creating observables.
 */
