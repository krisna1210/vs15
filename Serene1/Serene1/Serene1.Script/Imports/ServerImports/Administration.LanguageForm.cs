﻿using jQueryApi;
using Serenity;
using Serenity.ComponentModel;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Runtime.CompilerServices;

namespace Serene1.Administration
{
    public partial class LanguageForm : PrefixedContext
    {
        [InlineConstant]
        public const string FormKey = "Administration.Language";

        public LanguageForm(string idPrefix) : base(idPrefix) { }

        public StringEditor LanguageId { [InlineCode("{this}.w('LanguageId', Serenity.StringEditor)")] get; private set; }
        public StringEditor LanguageName { [InlineCode("{this}.w('LanguageName', Serenity.StringEditor)")] get; private set; }
    }
}

