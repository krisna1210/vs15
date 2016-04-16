﻿namespace Serene1.Northwind {
    export class ShipperForm extends Serenity.PrefixedContext {
        static formKey = 'Northwind.Shipper';

    }

    export interface ShipperForm {
        CompanyName(): Serenity.StringEditor;
        Phone(): PhoneEditor;
    }

    [['CompanyName', Serenity.StringEditor], ['Phone', PhoneEditor]].forEach(x => ShipperForm.prototype[<string>x[0]] = function() { return this.w(x[0], x[1]); });
}

