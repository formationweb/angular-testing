import { Directive, EventEmitter, HostListener, Input, Output } from "@angular/core";

@Directive({
    selector: '[confirm]'
})
export class ConfirmDirective {
    @Input('confirm') message = ''
    @Input() confirmUsername = ''
    @Output() onConfirm = new EventEmitter()

    @HostListener('click')
    openDialog() {
        const bool = window.confirm(this.message + ' ' + this.confirmUsername)
        if (bool) this.onConfirm.emit()
    }
}