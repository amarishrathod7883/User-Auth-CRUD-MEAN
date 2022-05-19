import { Component, OnInit } from '@angular/core';
import { BlogService } from '../_services/blog.service';
import { AuthService } from '../_services/auth.service';
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit 
{
  isLoggedIn = false;
  isDeleted = false;
  getAllBlogDetails: any = [];
  getAllBlogsCount = 0;
  role?: string;
  searchCondition: any = {};
  searchTitle: any;
  searchNotifier = new Subject();
  sortByTitle: any;
  sortByModifyDate: any;
  sortByStatus: any;
  sortByAuthor: any;
  sortBy = {
    field: '_id',
    order: 1
  };

  errorMessage = '';
  isGetBlogsFailed = false;

  // pagination variables START
  p: any;
  pages: any = 1;
  itemsperpage: any = 5;
  totalpages: any;
  totalitems: any;
  showing: any;
  to: any;
  // pagination variables END

  constructor(private AuthService: AuthService, private BlogService: BlogService) { }

  ngOnInit(): void 
  {
    if (!this.AuthService.isEmptyObject()) 
    {
      this.isLoggedIn = true
      const user = this.AuthService.getUser();
      this.role = user.role;

      this.searchCondition = {
        sortBy: this.sortBy,
        pages: this.pages,
        pageSize: this.itemsperpage 
      };

      if(this.role != 'Admin')
      {
        this.searchCondition.author = user._id;
      }
      this.getAllBlogs(this.searchCondition);
    }

    this.searchNotifier.pipe(debounceTime(1000))
    .subscribe(data => {
      this.searchCondition.title = !!this.searchTitle ? this.searchTitle : '';
      this.getAllBlogs(this.searchCondition);
    });
  }

  page($pages) 
  {
    this.pages = $pages;
    this.searchCondition.pages = $pages;
    this.getAllBlogs(this.searchCondition);
  }

  itemsPerPage($itemsperpage) 
  {
    this.itemsperpage = $itemsperpage;
    this.searchCondition.pageSize = $itemsperpage;
    this.getAllBlogs(this.searchCondition);
  }

  showingEntry() 
  {
    if (this.pages === this.totalpages) 
    {
      this.showing = ((this.pages * this.itemsperpage) - this.itemsperpage) + 1;
      this.to = this.pages * this.itemsperpage;
    } 
    else 
    {
      this.showing = ((this.pages * this.itemsperpage) - this.itemsperpage) + 1;
      this.to = this.pages * this.itemsperpage;
    }
  }

  FilterSortFunction(orderValue, fieldName)
  {
    this.sortBy.field = fieldName;
    this.sortBy.order = (orderValue == undefined) ? 1 : (orderValue == 1 ? -1 : 1);
    if(fieldName == 'title'){ this.sortByTitle = this.sortBy.order}
    if(fieldName == 'status'){ this.sortByStatus = this.sortBy.order}
    if(fieldName == 'modify_date'){ this.sortByModifyDate = this.sortBy.order}
    if(fieldName == 'author'){ this.sortByAuthor = this.sortBy.order}
    this.searchCondition.sortBy = this.sortBy;
    
    this.getAllBlogs(this.searchCondition);
  }

  getAllBlogs(searchCondition)
  {
    this.BlogService.getAllBlogs(searchCondition).subscribe(
      response => {
        console.log("response", response);
        this.isGetBlogsFailed = false;
        this.getAllBlogDetails = response.data;
        this.getAllBlogsCount = response.fetchedBlogsCount;
        this.showingEntry();
        this.totalpages = Math.ceil((response.fetchedBlogsCount)/this.pages);
        this.totalitems = response.fetchedBlogsCount;
      },
      err => 
      {
        this.isGetBlogsFailed = true;
        this.errorMessage = err.statusText;
      }
    );
  }

  removeSingleBlog(id: string): void 
  {
    this.BlogService.removeBlog(id)
      .subscribe(
        res => {
          this.isDeleted = true;
          this.isGetBlogsFailed = true;
          setTimeout(() => {
            this.isDeleted = false;
            this.getAllBlogs(this.searchCondition);
          }, 500);
        },
        err => {
          this.isGetBlogsFailed = false;
          this.errorMessage = err.statusText;
        });
  }

}
