import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
	selector: "auth-form",
	templateUrl: "./auth-form.component.html",
	styleUrls: ["./auth-form.component.scss"]
})
export class AuthFormComponent implements OnInit {
	form: FormGroup;
	@Output() submitted = new EventEmitter<FormGroup>();

	constructor(private fb: FormBuilder) { }

	ngOnInit() {
		this.form = this.fb.group({
			email: ["", Validators.email],
			password: ["", Validators.required]
		});
	}

	onSubmit() {
		if (this.form.valid) {
			this.submitted.emit(this.form);
		}
	}

	get passwordInvald() {
		const control = this.form.get('password');
		return control.hasError('required') && control.touched;
	}

	get emailFormat() {
		const control = this.form.get('email');
		return control.hasError('email') && control.touched;
	}
}
