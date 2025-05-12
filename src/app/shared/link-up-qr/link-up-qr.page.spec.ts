import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LinkUpQrPage } from './link-up-qr.page';

describe('LinkUpQrPage', () => {
  let component: LinkUpQrPage;
  let fixture: ComponentFixture<LinkUpQrPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkUpQrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
