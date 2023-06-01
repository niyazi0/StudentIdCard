export class Card{
    id!:number;
    cardBalance!:string;
}
export class Student{
    id!: string;
    name!: string;
    surname!: string;
    identityNumber!:number;
    city!:string;
    eMail!:string;
    card!:Card;
    borrowedBook!:BorrowedBook[];
    accountDetails!:AccountDetails[];
    foods!:Food[];
    
}
export class BookLibrary{
    id!:number;
    bookName!:string;
    author!:string;
    stock!:number;

}
export class BorrowedBook{
    id!:number;
    bookId!:number;

    borrowingDate!:string;
    returnDate!:string;
}

export class Market{
    id!:number;
    product!:string;
    price!:number;
}
export class AccountDetails{
    id!:number;
    process!:string;
    total!:string;
    date!:string;
}

export class Food{
    id!:number;
    product!:string;
    price!:number;
}

