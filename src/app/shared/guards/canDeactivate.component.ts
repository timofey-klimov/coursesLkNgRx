export interface ICanDeactivateComponent {
    canDeactivate: () =>  Promise<boolean>;
}