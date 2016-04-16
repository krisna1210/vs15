﻿using jQueryApi;
using Serenity;
using Serenity.ComponentModel;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Runtime.CompilerServices;

namespace Serene1.BasicSamples
{
    [Imported, Serializable, PreserveMemberCase]
    public partial class OrderBulkActionRequest : ServiceRequest
    {
        public List<Int32> OrderIDs { get; set; }
    }
}

