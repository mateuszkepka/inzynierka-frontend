import { Component } from "@angular/core";
import { FieldType } from "@ngx-formly/core";
import { MessageService } from "primeng/api";

@Component({
    selector: `app-formly-field-file-upload`,
    templateUrl: `./formly-field-primeng-file-upload.component.html`,
    styleUrls: [`./formly-field-primeng-file-upload.component.scss`],
    providers: [MessageService]
})
export class FormlyFieldPrimengFileUploadComponent extends FieldType {
    uploadedFiles: any[] = [];

    constructor(private messageService: MessageService) {
        super();
    }

    onUpload(event: any) {
        event.files.forEach(file => {
            this.uploadedFiles.push(file);
        });

        this.messageService.add({ severity: `info`, summary: `File uploaded`, detail: `` });
    }
}
