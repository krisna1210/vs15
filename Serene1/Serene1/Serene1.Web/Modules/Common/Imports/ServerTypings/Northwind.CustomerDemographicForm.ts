﻿namespace Serene1.Northwind {
    export class CustomerDemographicForm extends Serenity.PrefixedContext {
        static formKey = 'Northwind.CustomerDemographic';

    }

    export interface CustomerDemographicForm {
        CustomerTypeID(): Serenity.StringEditor;
        CustomerDesc(): Serenity.StringEditor;
    }

    [['CustomerTypeID', Serenity.StringEditor], ['CustomerDesc', Serenity.StringEditor]].forEach(x => CustomerDemographicForm.prototype[<string>x[0]] = function() { return this.w(x[0], x[1]); });
}

