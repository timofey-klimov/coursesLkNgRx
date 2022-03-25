import { Injectable } from "@angular/core";
import Swal from 'sweetalert2';

@Injectable({
    providedIn:'root'
})
export class NotificationService {

    showError(title:string, text: string, showConfirmButton: boolean = true, showCancelButton: boolean = false) {
        Swal.fire({
            title,
            text,
            showConfirmButton,
            showCancelButton,
            confirmButtonText: 'OK',
            cancelButtonText: 'Отмена',
            icon: 'error'
        })
    }

    showSuccess(title: string, text: string, showConfirmButton: boolean = true, showCancelButton: boolean = false) {
        Swal.fire({
            title,
            text,
            showConfirmButton,
            showCancelButton,
            confirmButtonText: 'OK',
            cancelButtonText: 'Отмена',
            icon: 'success'
        })
    }

    showWarning(title: string, text: string) {
        Swal.fire({
            title,
            text,
            showConfirmButton: true,
            confirmButtonText: 'OK',
            cancelButtonText: 'Отмена',
            icon: 'warning'
        });
    }

    withWarningWindow(text: string, confirmResult:() => void, ): void {
        Swal.fire({
            title: 'Внимание',
            text,
            confirmButtonText: 'OK',
            cancelButtonText: 'Отмена',
            showConfirmButton: true,
            showCancelButton: true
        }).then((result) => {
            if (result.isConfirmed) {
                confirmResult();
            }
        })
    }
}