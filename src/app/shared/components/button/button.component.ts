import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
  fas,
  faTrashCan,
  IconDefinition,
  faPencil,
  faPlus,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() buttonText: string = '';
  @Input() iconName: string = '';
  @Input() iconSize: SizeProp = '1x';
  @Input() disabled: boolean = false;
  @Input() type: 'button' | 'submit' = 'button';
  @Output() buttonClick = new EventEmitter<void>();

  mapIcons: { [key: string]: IconDefinition } = {
    delete: faTrashCan,
    edit: faPencil,
    add: faPlus,
    search: faSearch,
  };

  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }

  onClick(): void {
    this.buttonClick.emit();
  }
}
