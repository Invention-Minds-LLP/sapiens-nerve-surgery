// import { Component, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';

// @Component({
//   selector: 'app-root',
//   imports: [RouterOutlet],
//   templateUrl: './app.html',
//   styleUrl: './app.css'
// })
// export class App {
//   protected readonly title = signal('peripheral-nerve-app');
// }
// app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

interface FAQ {
  question: string;
  answer: string;
  isOpen: boolean;
}

interface Service {
  title: string;
  description: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  constructor(private fb: FormBuilder) { }
  navOpen = false;

  appointmentForm!: any;
  callbackForm!: any;

  ngOnInit(): void {
    this.appointmentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      otp: [''],
    });

    this.callbackForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      otp: [''],
    });
  }

  faqOpen: Record<number, boolean> = {
    1: false,
    2: true,  // matches screenshot where Q2 answer is visible
    3: false,
    4: false,
    5: false,
    6: false,
  };



  toggleNav() {
    this.navOpen = !this.navOpen;
  }

  sendOtp(which: 'appointment' | 'callback') {
    // UI-only replica: hook your real OTP API here
    if (which === 'appointment') {
      this.appointmentForm.patchValue({ otp: '' });
    } else {
      this.callbackForm.patchValue({ otp: '' });
    }
  }

  submit(which: 'appointment' | 'callback') {
    // UI-only replica: hook your submit API here
    const form = which === 'appointment' ? this.appointmentForm : this.callbackForm;
    form.markAllAsTouched();
    if (form.valid) {
      // do submit
      alert('Submitted');
    }
  }

  toggleFaq(id: number) {
    this.faqOpen[id] = !this.faqOpen[id];
  }
}