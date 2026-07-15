
export type ToastType = 'Success' | 'Error' | 'Warning' | 'Info';

export type ToastPosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left';

export interface toaster {
  type : ToastType,
  icon : string,
  message :string,
  position : ToastPosition,
  duration? : number
}