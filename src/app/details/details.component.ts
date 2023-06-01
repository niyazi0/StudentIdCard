import { Component,OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {StudentService} from '../student.service';
import { BookLibrary, Card, Food, Market, Student } from '../model';
import { LibraryService } from '../library.service';
import { MarketService } from '../market.service';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { FoodService } from '../food.service';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  

})

export class DetailsComponent {
  id = this.route.snapshot.paramMap.get('id');
  student:Student= new Student;
  card:Card=new Card;
  borrows:any[]=[];
  books:any[]=[];
  bookLibrary: BookLibrary[]=[];
  newBalance!:number;
  message!:string;
  market:Market[] = [];
  food:Food[]=[];
  shoppingCart: any=[];
  shoppingTotalPrice:number=0;
  constructor (private router: Router,
               private route:ActivatedRoute,
               private studentService: StudentService,
               private bookLibraryService:LibraryService,
               private marketService:MarketService,
               private foodService: FoodService,
               public dialog: MatDialog
               ){}
               
   ngOnInit(){
    this.studentService.getUserById(this.id)
    .subscribe(response=>{
      this.student=response;

      this.bookLibraryService.getBooks()
      .subscribe(books=>{this.student.borrowedBook.forEach(book=>{
        if(book.returnDate=="")
        {
          this.books.push(books.find(b=> b.id === book.bookId));
          this.borrows.push(book);  
        }

         
      });
      })
    })

    this.marketService.getList()
    .subscribe(response=>{
      this.market=response;
      
    })

    this.foodService.getList()
    .subscribe(response=>{
      this.food=response;
      
    })
    this.bookLibraryService.getBooks()
    .subscribe(response=>{
      this.bookLibrary=response;
    
    }
      )
  }

  bankDeposit(get:any)
  {
    if(Number(get)<0)
    {
      alert("Buradan para çekemezsiniz");
    }
    else if(Number(get>5000))
    {
      alert("tek seferde en fazla 5000₺ yatırabilirsiniz.")
    }
    else
    {
      const detailsLength= this.student.accountDetails.length;
      this.student.accountDetails.push({id:detailsLength+1, process:"Bankamatik - Para Yatırma",  total:(get).toString(), date: Date.now().toString()})
      this.newBalance=Number(get)+Number(this.student.card.cardBalance)
      this.newBalance.toFixed(2);
      this.student.card.cardBalance= this.newBalance.toFixed(2);
      this.studentService.updateUser(this.student, this.id)
            .subscribe(response=>{
          
  
            })
    }
  }
  
  withDrawMoney(get:any)
  {
    if(Number(get)<0)
    {
      alert("Geçersiz değer.")
    }
    else if(Number(get)<=Number(this.student.card.cardBalance))
    {
    const detailsLength= this.student.accountDetails.length;
    this.student.accountDetails.push({id:detailsLength+1, process:"Bankamatik - Para Çekme",  total:(get*-1).toString(), date: Date.now().toString()})
    this.newBalance=Number(this.student.card.cardBalance)-Number(get)
    this.newBalance.toFixed(2);
    this.student.card.cardBalance= this.newBalance.toFixed(2) as any as string;
    this.studentService.updateUser(this.student , this.id)
          .subscribe(response=>{
          

          })

    }
    
    else
    {
      alert('yeterli para yok.')
    }

  }

  addShoppingCart(getProduct:any, amount: any)
  {
      
      if(amount >0)
      {
        let price= (getProduct.price*1.18* parseInt(amount)).toFixed(2)
        this.shoppingCart.push({product: getProduct.product, amount:parseInt(amount), price: price});
        this.shoppingTotalPrice += parseFloat(price);
        this.shoppingTotalPrice = parseFloat(this.shoppingTotalPrice.toFixed(2));
    
      }

  }
  
  addShoppingCartFood(getProduct:any, amount: any)
  {
      
      if(amount >0)
      {
        let price= (getProduct.price*1.01* parseInt(amount)).toFixed(2)
        this.shoppingCart.push({product: getProduct.product, amount:parseInt(amount), price: price});
        this.shoppingTotalPrice += parseFloat(price);
        this.shoppingTotalPrice = parseFloat(this.shoppingTotalPrice.toFixed(2));
    
      }

  }
  buyProducts(getProcess:string)
  {
    if(this.shoppingTotalPrice< parseFloat( this.student.card.cardBalance))
    {
      
      const detailsLength= this.student.accountDetails.length;
      this.student.accountDetails.push({id:detailsLength+1, process:getProcess,  total:(this.shoppingTotalPrice*-1).toString(), date: Date.now().toString()})
        this.newBalance=parseFloat(this.student.card.cardBalance)- this.shoppingTotalPrice
        this.student.card.cardBalance = this.newBalance.toFixed(2);
        this.studentService.updateUser(this.student, this.id)
        .subscribe(response=>{
          this.shoppingTotalPrice=0;
          this.shoppingCart=[];
          alert("Alışveriş Tamamlandı!")
        })
    }
    else
    {
       alert('Yetersiz Bakiye');
    }
  }

  rentBook(getBook:any)
  {
    let control=0;
    this.borrows.forEach(book=>{
    if(book.bookId==getBook.id && book.returnDate=='')
    {
      control=1;
      alert("Bu kitap elinizde var.");
    } 
  })
    if(control==0)
    {
      
      const bookLengt=this.student.borrowedBook.length;
      const rentBook={id:bookLengt+1, bookId: getBook.id, borrowingDate: Date.now().toString(), returnDate: "" };
      this.student.borrowedBook.push(rentBook)
   
      this.books.push(getBook);
      this.borrows.push(rentBook);
      const bookIndex=this.bookLibrary.findIndex(b=> b.id === getBook.id);
      this.bookLibrary[bookIndex].stock-=1;
      this.studentService.updateUser(this.student, this.id)
      .subscribe(response=>{
        this.bookLibraryService.updateBook(this.bookLibrary[bookIndex], getBook.id)
        .subscribe();
      });


      console.log(this.bookLibrary);
    }
  }

  returnBook(getBook: any)
  {
    let dropBook=0;
      // console.log(getBook);
      this.student.borrowedBook.forEach(book=>{
        if(book.bookId==getBook.id)
        {
          dropBook=book.bookId;
          book.returnDate=Date.now().toString();
        }
      })
      if(dropBook !=0)
      {
        let deleteIndex= this.books.findIndex(row=> row.id === dropBook)
        this.books.splice(deleteIndex, 1);
        this.borrows.splice(deleteIndex,1);
      
        const bookIndex=this.bookLibrary.findIndex(b=> b.id === dropBook);
        this.bookLibrary[bookIndex].stock+=1;
        this.studentService.updateUser(this.student, this.id)
        .subscribe(response=>{
          this.bookLibraryService.updateBook(this.bookLibrary[bookIndex], getBook.id)
          .subscribe();
        });     
      }  
  }

  getBookhistory()
  {
    const dialogRef = this.dialog.open(DialogComponent,{
      width:'60%',
      height:'70%',
      data:{
        id:this.id,
        type:'book',
      }
    });
  }
  getAccounthistory()
  {
    const dialogRef = this.dialog.open(DialogComponent,{
      width:'60%',
      height:'70%',
      data:{
        id:this.id,
        type:'account',
      }
    });
  }


    
}
