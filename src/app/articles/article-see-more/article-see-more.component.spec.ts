import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleSeeMoreComponent } from './article-see-more.component';

describe('ArticleSeeMoreComponent', () => {
  let component: ArticleSeeMoreComponent;
  let fixture: ComponentFixture<ArticleSeeMoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleSeeMoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleSeeMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
