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
    [Imported, Serializable, PreserveMemberCase]
    public partial class TranslationItem
    {
        public String Key { get; set; }
        public String SourceText { get; set; }
        public String TargetText { get; set; }
        public String CustomText { get; set; }
    }
}

