import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
    selector: 'yeijara-login',
    templateUrl: 'login.html',
    styleUrls: ['login.component.css'],
    providers: [UserService]
})

export class LoginComponent implements OnInit {
    public title = 'NEQUI';
    public identity;
    public token;
    public errorMessage;
    public user: User;

    constructor(private _route: ActivatedRoute, private _router: Router, private _userService: UserService) {
        this.errorMessage = null;
        this.user = new User('', '', 0, '', null, null, '', '', '', '');
    }

    ngOnInit() {
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
    }

    public onSubmit() {
        // Conseguir datos del usuario identificado
        this._userService.signUp(this.user).subscribe(
            response => {
                this.identity = response.user;

                if (!this.identity._id) {
                    alert("El usuario no está correctamente identificado");
                } else {
                    // Crear elemento en el sessionstorage para tener al usuario en sesion
                    sessionStorage.setItem('identity', JSON.stringify(this.identity));

                    // Conseguir el token para enviarselo a cada peticion http
                    this._userService.signUp(this.user, 'true').subscribe(
                        response => {
                            this.token = response.token;

                            if (this.token.lenght <= 0) {
                                alert("El token no se ha generado correctamente");
                            } else {
                                // Crear elemento en el sessionstorage para tener el token disponible
                                sessionStorage.setItem('token', this.token);
                                this.user = new User('', '', 0, '', null, null, '', '', '', '');
                                this._router.navigate(['/home']);
                            }
                        }, error => { var body = JSON.parse(error._body); this.errorMessage = body.message }
                    );
                }
            }, error => { var body = JSON.parse(error._body); this.errorMessage = body.message }
        );
    }
}