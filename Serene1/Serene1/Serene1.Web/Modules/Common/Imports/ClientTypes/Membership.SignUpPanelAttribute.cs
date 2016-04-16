using Serenity;
using Serenity.ComponentModel;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;

namespace Serene1.Membership
{
    public partial class SignUpPanelAttribute : CustomEditorAttribute
    {
        public const string Key = "Serene1.Membership.SignUpPanel";

        public SignUpPanelAttribute()
            : base(Key)
        {
        }
    }
}

