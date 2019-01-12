import { Injectable } from '@angular/core';
import { Store } from 'store';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from 'src/app/auth/shared/services/auth/auth.service';
import { tap } from 'rxjs/internal/operators/tap';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { filter } from 'rxjs/internal/operators/filter';

export interface Workout {
    name: string,
    type: string,
    strength: any,
    endurance: any,
    timestamp: number;
    key: string,
    $exists: () => boolean
}

@Injectable()
export class WorkoutsService {

    workouts$: Observable<Workout[]> = this.db.list<any>(`workouts/${this.uid}`).snapshotChanges().pipe(
        map(actions => actions.map(a => ({ key: a.key, ...a.payload.val() }))),
        tap(next => this.store.set('workouts', next))
    )

    constructor(
        private store: Store,
        private db: AngularFireDatabase,
        private authService: AuthService
    ) { }

    get uid() {
        return this.authService.user.uid;
    }

    getWorkout(key) {
        if (!key) return of({})

        return this.store.select<Workout[]>('workouts').pipe(
            filter(Boolean),
            map(workouts => workouts.find((workout: Workout) => workout.key === key))
        )
    }

    addWorkout(workout: Workout) {
        return this.db.list<any>(`workouts/${this.uid}`).push(workout);
    }

    updateWorkout(key: string, workout: Workout) {
        return this.db.object(`workouts/${this.uid}/${key}`).update(workout);
    }

    removeWorkout(key: string) {
        return this.db.list(`workouts/${this.uid}`).remove(key);
    }

}
