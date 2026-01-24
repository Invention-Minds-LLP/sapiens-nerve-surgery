
import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { NavBar } from "./nav-bar/nav-bar";
import { Footer } from "./footer/footer";
import { CallBackFrom } from "./call-back-from/call-back-from";
import { ContactForm } from "./contact-form/contact-form";

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
  imports: [CommonModule, ReactiveFormsModule, NavBar, Footer, CallBackFrom, ContactForm],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  constructor(private fb: FormBuilder) { }
  navOpen = false;

  appointmentForm!: any;
  callbackForm!: any;

  ngOnInit(): void {

    this.observeSubNav();
  }

  toggleNav() {
    this.navOpen = !this.navOpen;
  }



  faqs = [
    {
      question: 'Is peripheral nerve surgery of the hand safe?',
      answer: 'Yes. When performed after proper evaluation, peripheral nerve surgery is generally safe. Risks are discussed in detail before treatment.'
    },
    {
      question: 'Will peripheral nerve surgery be painful?',
      answer: 'Pain is well controlled with medications and post-operative care.'
    },
    {
      question: 'How long does nerve recovery take?',
      answer: 'Peripheral nerve healing takes time. Recovery may continue for several months depending on the injury.'
    },
    {
      question: 'Is physiotherapy required after peripheral nerve surgery?',
      answer: 'Yes. Rehabilitation is essential to regain hand strength and function.'
    },
    {
      question: 'When can I return to work?',
      answer: 'This depends on your job type and recovery progress.'
    },
    {
      question: 'Is surgery always needed for peripheral nerve problems?',
      answer: 'No. Many peripheral nerve conditions improve with non-surgical treatment. Surgery is advised only when conservative care fails.'
    },
  ];

  @ViewChild('subNavScroll') subNavScroll!: ElementRef;
  @Input() menuOpen = false;


  isStuck = false;
  isAtStart = true;
  isAtEnd = false;

  activeIndex: number | null = null;

  toggleFAQ(index: number) {
    this.activeIndex = this.activeIndex === index ? null : index;
  }

  scrollTo(sectionId: string) {
    const el = document.getElementById(sectionId);

    if (el) {
      const yOffset = -100; // adjust if you have sticky navbar
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  }

  ngAfterViewInit(): void {
    // Check initial scroll position
    this.checkScrollPosition();

    // Add scroll event listener to the sub-nav scroll container
    if (this.subNavScroll) {
      this.subNavScroll.nativeElement.addEventListener('scroll', () => {
        this.checkScrollPosition();
      });
    }
  }

  centerTab(event: Event) {
    if (!this.subNavScroll) return;

    const container = this.subNavScroll.nativeElement as HTMLElement;
    const target = event.target as HTMLElement;

    container.scrollTo({
      left: target.offsetLeft - container.clientWidth / 2 + target.offsetWidth / 2,
      behavior: 'smooth'
    });
  }


  ngOnDestroy(): void {
    // Clean up event listeners if needed
  }

  // Method to observe when sub-nav becomes sticky
  observeSubNav(): void {
    const subNav = document.querySelector('.sub-nav');
    const banner = document.querySelector('.banner-part');

    if (subNav && banner) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          this.isStuck = !entry.isIntersecting;
        },
        {
          threshold: 0,
          rootMargin: '-80px 0px 0px 0px' // Account for fixed navbar height
        }
      );

      observer.observe(banner);
    }
  }
  scrollRight(): void {
    if (!this.subNavScroll) return;

    const container = this.subNavScroll.nativeElement as HTMLElement;
    const items = container.querySelectorAll('li');
    const containerCenter = container.scrollLeft + container.clientWidth / 2;

    for (let i = 0; i < items.length; i++) {
      const item = items[i] as HTMLElement;
      const itemCenter = item.offsetLeft + item.offsetWidth / 2;

      if (itemCenter > containerCenter + 10) {
        container.scrollTo({
          left: item.offsetLeft - container.clientWidth / 2 + item.offsetWidth / 2,
          behavior: 'smooth'
        });
        return;
      }
    }
  }

  scrollLeft(): void {
    if (!this.subNavScroll) return;

    const container = this.subNavScroll.nativeElement as HTMLElement;
    const items = container.querySelectorAll('li');
    const containerCenter = container.scrollLeft + container.clientWidth / 2;

    for (let i = items.length - 1; i >= 0; i--) {
      const item = items[i] as HTMLElement;
      const itemCenter = item.offsetLeft + item.offsetWidth / 2;

      if (itemCenter < containerCenter - 10) {
        container.scrollTo({
          left: item.offsetLeft - container.clientWidth / 2 + item.offsetWidth / 2,
          behavior: 'smooth'
        });
        return;
      }
    }
  }


  // Check scroll position to enable/disable arrows
  checkScrollPosition(): void {
    if (this.subNavScroll) {
      const scrollContainer = this.subNavScroll.nativeElement;
      const scrollLeft = scrollContainer.scrollLeft;
      const scrollWidth = scrollContainer.scrollWidth;
      const clientWidth = scrollContainer.clientWidth;

      // Check if at start
      this.isAtStart = scrollLeft <= 0;

      // Check if at end (with small tolerance)
      this.isAtEnd = scrollLeft + clientWidth >= scrollWidth - 5;
    }
  }

  // Alternative method using scroll listener for stuck effect
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const subNav = document.querySelector('.sub-nav');
    const banner = document.querySelector('.banner-part');

    if (subNav && banner) {
      const bannerBottom = banner.getBoundingClientRect().bottom;
      const navbarHeight = 80; // Height of fixed main navbar

      if (bannerBottom <= navbarHeight + 73) { // 73 is sub-nav height
        this.isStuck = true;
      } else {
        this.isStuck = false;
      }
    }
  }

  // Handle window resize to check scroll position
  @HostListener('window:resize', [])
  onResize(): void {
    this.checkScrollPosition();
  }

  // Smooth scroll to sections (optional)
  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 160; // 80 (main nav) + 73 (sub nav)
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  isExpanded = false;

  toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
  }

}