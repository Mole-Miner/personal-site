import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Directive,
  EventEmitter,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialogModule, MatButtonModule, MatIconModule } from 'personal-site-material';

@Directive({
  selector: '[uiDialogHeader]',
  standalone: true
})
export class DialogHeaderTemplateDirective {
  constructor(public readonly templateRef: TemplateRef<unknown>) {
  }
}

@Directive({
  selector: '[uiDialogBody]',
  standalone: true
})
export class DialogBodyTemplateDirective {
  constructor(public readonly templateRef: TemplateRef<unknown>) {
  }
}

@Directive({
  selector: '[uiDialogHeaderHost]',
  standalone: true
})
export class DialogHeaderHostDirective {
  constructor(public readonly containerRef: ViewContainerRef) {
  }
}

@Directive({
  selector: '[uiDialogBodyHost]',
  standalone: true
})
export class DialogBodyHostDirective {
  constructor(public readonly containerRef: ViewContainerRef) {
  }
}

@Component({
  selector: 'ui-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    DialogHeaderTemplateDirective,
    DialogBodyTemplateDirective,
    DialogHeaderHostDirective,
    DialogBodyHostDirective
  ],
  templateUrl: './dialog.component.html',
  styleUrls: [ './dialog.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogComponent implements OnInit {
  @ContentChild(DialogHeaderTemplateDirective, { static: true })
  dialogHeaderTemplate!: DialogHeaderTemplateDirective;

  @ContentChild(DialogBodyTemplateDirective, { static: true })
  dialogBodyTemplate!: DialogBodyTemplateDirective;

  @ViewChild(DialogHeaderHostDirective, { static: true })
  dialogHeaderHost!: DialogHeaderHostDirective;

  @ViewChild(DialogBodyHostDirective, { static: true })
  dialogBodyHost!: DialogBodyHostDirective;

  @Output()
  close = new EventEmitter<void>();

  ngOnInit() {
    this.dialogHeaderHost.containerRef.createEmbeddedView(this.dialogHeaderTemplate.templateRef);
    this.dialogBodyHost.containerRef.createEmbeddedView(this.dialogBodyTemplate.templateRef);
  }

  onClose() {
    this.close.emit();
  }
}
