/**
 * Update the following components to meet the requirements : 
 * 
 * * Bind [email] property to input[name="email"]
 * * Bind [password] property to input[name="password"]
 * 
 * Without using angular forms, validate both fields so that :
 * * email is in correct format ( ex: ends with @a.com)
 * * password contains at least one special character, one upper case character, one lower case character, one number and a minium of 8 characters in length
 * * The fields should be validated when trying to submit the form
 * * Prevent the form from doing an actual form submit and instead, after validation pass, turn on the [logged_in] flag
 * 
 * You can add error messages below each field that shows if the field is not valid
 */
import { Component, NgModule  } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';

@Component({
    selector : 'ng-app',
    template : `<form>
                    <h2>Login</h2>
                    <br/>
                    <input type="email" [value]="email" (input)="isEmailChange($event)" name="email"/>
                    <p *ngIf="invalidEmail" style="color: orangered">Email is not valid</p>
                    <br/>
                    <input type="password" [value]="password" (input)="isPasswordChange($event)" name="password" />
                    <p *ngIf="invalidPassword" style="color: orangered">Password is weak</p>
                    <button type="submit" (click)="submitForm($event)">Submit</button>
                    <br/><br/>
                    <div *ngIf="logged_in">Logged In!</div>
                </form>`
})
export class Test03Component {

    email:string = "";
    password:string = "";

    invalidEmail = false;
    invalidPassword = false;

    logged_in = false;

    emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d.@$!%*?&]{8,}$/;

    isEmailChange = ($event: any) => {
        this.email = $event.target.value;
    }
    
    isPasswordChange = ($event: any) => {
        this.password = $event.target.value;
    }

    formValidation() {
        this.invalidEmail = false;
        this.invalidPassword = false;

        if (!this.emailRegex.test(this.email)) {
            console.log('check email', this.emailRegex.test(this.email))
            this.invalidEmail = true;
        }
        
        if (!this.passwordRegex.test(this.password)) {
            console.log('check password', this.passwordRegex.test(this.password))
            this.invalidPassword = true;
        }
    }

    submitForm = (e) => {
        e.preventDefault();
        this.formValidation();
        if(!this.invalidEmail && !this.invalidPassword) {
            this.logged_in = true;
        }
    }

}

@NgModule({
    imports : [
        CommonModule,
        RouterModule.forChild([
            {
                path : "",
                component : Test03Component
            }
        ])
    ],
    declarations : [Test03Component]
})
export class Test03Module {};