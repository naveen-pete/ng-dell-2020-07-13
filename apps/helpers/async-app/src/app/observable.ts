import { Observable, Observer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { users, posts } from './data';

const getUser = (userName: string) => {
  return Observable.create((observer: Observer<any>) => {
    console.log('observable - getUser() started.');
    setTimeout(() => {
      const user = users.find(
        u => u.name === userName
      );

      if (!user) {
        observer.error('Could not find user.');
      } else {
        observer.next(user);
      }

    }, 3000);
  })
};

const getPosts = (userId: number) => {
  return Observable.create((observer: Observer<any>) => {
    console.log('getPosts() started.');
    setTimeout(() => {
      const postsForUser = posts.filter(
        p => p.userId === userId
      );

      if (postsForUser.length <= 0) {
        observer.error('Could not find posts for user');
      } else {
        observer.next(postsForUser);
      }

    }, 3000);
  });
};

export const doWork = () => {
  getUser('hari')
    .pipe(
      switchMap((user: any) => {
        console.log('user:', user);
        return getPosts(user.id);
      })
    )
    .subscribe(
      (posts: any) => {
        console.log('posts for user:', posts);
      },
      (error: any) => {
        console.log('Error:', error);
      }
    );
};

// map((user: any) => {
//   const newUser = { ...user, name: user.name.toUpperCase() };
//   return newUser;
// }),
