﻿namespace Serene1.Membership {
    export class ForgotPasswordForm extends Serenity.PrefixedContext {
        static formKey = 'Membership.ForgotPassword';

    }

    export interface ForgotPasswordForm {
        Email(): Serenity.EmailEditor;
    }

    [['Email', Serenity.EmailEditor]].forEach(x => ForgotPasswordForm.prototype[<string>x[0]] = function() { return this.w(x[0], x[1]); });
}

