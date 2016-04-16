using jQueryApi;
using Serenity;
using Serenity.ComponentModel;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Runtime.CompilerServices;

namespace Serene1.Membership
{
    [Imported, Serializable, PreserveMemberCase]
    public partial class ForgotPasswordRequest : ServiceRequest
    {
        public String Email { get; set; }
    }
}

