import { trigger, transition, style, animate } from '@angular/animations';

/**
 * It does an effect that fake-resizes pages on router.url change 
 */
export const resizeAnimation = trigger('resizeAnimation', [
  transition(':enter', [
    style({ height: 0, opacity: 0 }),
    animate('500ms', style({ height: '*', opacity: 1 })),
  ]),
  transition(':leave', [
    style({ height: '*', opacity: 1 }),
    animate('500ms', style({ height: 0, opacity: 0 })),
  ]),
]);

export const fadeInOutAnimation = trigger('fadeInOutAnimation', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('500ms', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    animate('500ms', style({ opacity: 0 }))
  ])
]);