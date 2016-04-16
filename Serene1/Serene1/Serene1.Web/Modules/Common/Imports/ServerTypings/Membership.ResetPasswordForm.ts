﻿namespace Serene1.Membership {
    export class ResetPasswordForm extends Serenity.PrefixedContext {
        static formKey = 'Membership.ResetPassword';

    }

    export interface ResetPasswordForm {
        NewPassword(): Serenity.PasswordEditor;
        ConfirmPassword(): Serenity.PasswordEditor;
    }

    [['NewPassword', Serenity.PasswordEditor], ['ConfirmPassword', Serenity.PasswordEditor]].forEach(x => ResetPasswordForm.prototype[<string>x[0]] = function() { return this.w(x[0], x[1]); });
}

