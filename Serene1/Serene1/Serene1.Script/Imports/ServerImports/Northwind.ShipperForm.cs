using jQueryApi;
using Serenity;
using Serenity.ComponentModel;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Runtime.CompilerServices;

namespace Serene1.Northwind
{
    public partial class ShipperForm : PrefixedContext
    {
        [InlineConstant]
        public const string FormKey = "Northwind.Shipper";

        public ShipperForm(string idPrefix) : base(idPrefix) { }

        public StringEditor CompanyName { [InlineCode("{this}.w('CompanyName', Serenity.StringEditor)")] get; private set; }
        public PhoneEditor Phone { [InlineCode("{this}.w('Phone', Serene1.Northwind.PhoneEditor)")] get; private set; }
    }
}

