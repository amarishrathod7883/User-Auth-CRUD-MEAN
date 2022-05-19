import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,  Router } from '@angular/router';
import { TreeviewItem, TreeviewConfig } from "ngx-treeview";
import { BlogService } from '../_services/blog.service';
import { AuthService } from '../_services/auth.service'
import * as moment from 'moment';

@Component({
  selector: 'app-form-blog',
  templateUrl: './form-blog.component.html',
  styleUrls: ['./form-blog.component.css']
})
export class FormBlogComponent implements OnInit {

  form: any = {
    title: null,
    description: null,
    modify_date: null,
    status: '',
    category: null,
    author: null,
  };

  currentBlogId: any;
  isSuccessful = false;
  isCreateUpdateFailed = false;
  errorMessage = '';
  PageHeader = 'Create';
  getAllCategoryArray: any = [];
  items: any;

  config: TreeviewConfig = {
    hasAllCheckBox: true,
    hasFilter: false,
    hasCollapseExpand: false,
    decoupleChildFromParent: false,
    maxHeight: 500,
    hasDivider: true
  };

  constructor(private BlogService: BlogService, private AuthService: AuthService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void 
  {
    
    this.getAllCategory();
    this.currentBlogId = this.route.snapshot.params.id;
    if(this.currentBlogId != 'new')
    {
      this.PageHeader = 'Update';
      this.getSingleBlog(this.currentBlogId);
    }

    if (!this.AuthService.isEmptyObject()) 
    {
      const user = this.AuthService.getUser();
      this.form.author = user._id;
    }
    
    //$('.datepicker').datepicker();
  }

  getAllCategory()
  {
    this.BlogService.getAllCategory()
      .subscribe(
        res => {
          this.getAllCategoryArray = res.data;
          this.items = this.getItems(this.getAllCategoryArray);
        },
        err => 
        {
          this.isCreateUpdateFailed = false;
          this.errorMessage = err.statusText;
        });
  }

  getItems(parentChildObj) 
  {
    var itemsArray = [];
    parentChildObj.forEach(set => 
    {
      itemsArray.push(new TreeviewItem(set))
    });
    return itemsArray;
  }

  getSingleBlog(_id): void 
  {
    this.BlogService.getSingleBlog(_id)
      .subscribe(
        res => {
          var responseNew = res.data;
          console.log("responseNew", responseNew);
          this.form.title = responseNew.title;
          this.form.description = responseNew.description;
          this.form.modify_date = moment(new Date(responseNew.modify_date)).format("YYYY-MM-DD");
          this.form.status = responseNew.status;
          this.form.author = responseNew.author;
          if(!!responseNew.category && responseNew.category != null )
          {
            this.form.category = JSON.parse(responseNew.category);
            this.treeNodeChainFunction(JSON.parse(responseNew.category));
          }
        },
        err => 
        {
          this.isCreateUpdateFailed = false;
          this.errorMessage = err.statusText;
        });
  }

  treeNodeChainFunction(category)
  {
    this.items.forEach(element => 
    {
      this.treeNodeSelectFunction(element, category);
    });
  }

  treeLoopingFunction(OBJ, category)
  {
    var counter = 0;
    OBJ.internalChildren.forEach(element => 
    {
      this.treeNodeSelectFunction(element, category);
      counter++;
      if(counter == OBJ.internalChildren.length)
      {
        var checkValue = (OBJ.internalChildren).find(x => x.internalChecked == false);
        if(checkValue == undefined)
        {
          OBJ.internalChecked = true;
        }
      }
    });
  }

  treeNodeSelectFunction(OBJ, category)
  {
    if(OBJ.hasOwnProperty('internalChildren'))
    {
      this.treeLoopingFunction(OBJ, category);
    }
    else
    {
      var checkValue = category.find(x => x == OBJ.value);
      if(checkValue != undefined)
      {
        OBJ.internalChecked = true;
      }
    }
  }

  onSelectedChange(event)
  {
    this.form.category = event;
  }
  
  onCreateUpdate(): void 
  {
    console.log("this.form", this.form);
    this.BlogService.createUpdateBlog(this.currentBlogId, this.form).subscribe(
      res => {
        this.isSuccessful = true;
        this.isCreateUpdateFailed = false;
        this.router.navigate(['blog']);
      },
      err => {
        this.errorMessage = err.statusText;
        this.isCreateUpdateFailed = true;
      }
    );
  }
}
