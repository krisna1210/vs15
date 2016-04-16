using Serenity;
using Serenity.ComponentModel;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;

namespace Serene1.Membership
{
    public partial class ChangePasswordPanelAttribute : CustomEditorAttribute
    {
        public const string Key = "Serene1.Membership.ChangePasswordPanel";

        public ChangePasswordPanelAttribute()
            : base(Key)
        {
        }
    }
}

