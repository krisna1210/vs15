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
    public partial class TranslationUpdateRequest : ServiceRequest
    {
        public String TargetLanguageID { get; set; }
        public JsDictionary<String, String> Translations { get; set; }
    }
}

