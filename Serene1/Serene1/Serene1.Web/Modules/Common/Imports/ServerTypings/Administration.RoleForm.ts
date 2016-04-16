﻿namespace Serene1.Administration {
    export class RoleForm extends Serenity.PrefixedContext {
        static formKey = 'Administration.Role';

    }

    export interface RoleForm {
        RoleName(): Serenity.StringEditor;
    }

    [['RoleName', Serenity.StringEditor]].forEach(x => RoleForm.prototype[<string>x[0]] = function() { return this.w(x[0], x[1]); });
}

