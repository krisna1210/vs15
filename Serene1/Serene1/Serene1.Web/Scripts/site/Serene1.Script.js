(function() {
	'use strict';
	var $asm = {};
	global.Serene1 = global.Serene1 || {};
	global.Serene1.Administration = global.Serene1.Administration || {};
	global.Serene1.BasicSamples = global.Serene1.BasicSamples || {};
	global.Serene1.Common = global.Serene1.Common || {};
	global.Serene1.Membership = global.Serene1.Membership || {};
	global.Serene1.Northwind = global.Serene1.Northwind || {};
	global.Serenity = global.Serenity || {};
	ss.initAssembly($asm, 'Serene1.Script');
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Authorization
	var $Serene1_Authorization = function() {
	};
	$Serene1_Authorization.__typeName = 'Serene1.Authorization';
	$Serene1_Authorization.get_userDefinition = function() {
		return Q.getRemoteData('UserData');
	};
	$Serene1_Authorization.hasPermission = function(permissionKey) {
		return $Serene1_Authorization.get_userDefinition().Username === 'admin' || !!$Serene1_Authorization.get_userDefinition().Permissions[permissionKey];
	};
	global.Serene1.Authorization = $Serene1_Authorization;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.BasicProgressDialog
	var $Serene1_BasicProgressDialog = function() {
		this.$6$CancelledField = false;
		this.$6$CancelTitleField = null;
		Serenity.TemplatedDialog.call(this, null);
		var self = this;
		this.ById('ProgressBar').progressbar({
			max: 100,
			value: 0,
			change: function(e, v) {
				self.ById('ProgressLabel').text(self.get_value() + ' / ' + self.get_max());
			}
		});
	};
	$Serene1_BasicProgressDialog.__typeName = 'Serene1.BasicProgressDialog';
	global.Serene1.BasicProgressDialog = $Serene1_BasicProgressDialog;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.BulkServiceAction
	var $Serene1_BulkServiceAction = function() {
		this.keys = null;
		this.queue = null;
		this.progressDialog = null;
		this.pendingRequests = 0;
		this.completedRequests = 0;
		this.$successCount = 0;
		this.$errorCount = 0;
		this.errorByKey = null;
		this.$2$DoneField = null;
	};
	$Serene1_BulkServiceAction.__typeName = 'Serene1.BulkServiceAction';
	global.Serene1.BulkServiceAction = $Serene1_BulkServiceAction;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.DialogUtils
	var $Serene1_DialogUtils = function() {
	};
	$Serene1_DialogUtils.__typeName = 'Serene1.DialogUtils';
	$Serene1_DialogUtils.pendingChangesConfirmation = function(element, hasPendingChanges) {
		element.bind('dialogbeforeclose', function(e) {
			if (!Serenity.WX.hasOriginalEvent(e) || !hasPendingChanges()) {
				return;
			}
			e.preventDefault();
			Q.confirm('You have pending changes. Save them?', function() {
				element.find('div.save-and-close-button').click();
			}, {
				onNo: function() {
					element.dialog().dialog('close');
				}
			});
		});
	};
	global.Serene1.DialogUtils = $Serene1_DialogUtils;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.LanguageList
	var $Serene1_LanguageList = function() {
	};
	$Serene1_LanguageList.__typeName = 'Serene1.LanguageList';
	$Serene1_LanguageList.get_value = function() {
		var result = [];
		var $t1 = Q.getLookup('Administration.Language').get_items();
		for (var $t2 = 0; $t2 < $t1.length; $t2++) {
			var k = $t1[$t2];
			if (k.LanguageId !== 'en') {
				result.push({ item1: k.Id.toString(), item2: k.LanguageName });
			}
		}
		return result;
	};
	global.Serene1.LanguageList = $Serene1_LanguageList;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.ScriptInitialization
	var $Serene1_ScriptInitialization = function() {
	};
	$Serene1_ScriptInitialization.__typeName = 'Serene1.ScriptInitialization';
	global.Serene1.ScriptInitialization = $Serene1_ScriptInitialization;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Administration.LanguageDialog
	var $Serene1_Administration_LanguageDialog = function() {
		Serenity.EntityDialog.call(this);
	};
	$Serene1_Administration_LanguageDialog.__typeName = 'Serene1.Administration.LanguageDialog';
	global.Serene1.Administration.LanguageDialog = $Serene1_Administration_LanguageDialog;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Administration.LanguageForm
	var $Serene1_Administration_LanguageForm = function(idPrefix) {
		this.$3$LanguageIdField = null;
		this.$3$LanguageNameField = null;
		Serenity.PrefixedContext.call(this, idPrefix);
	};
	$Serene1_Administration_LanguageForm.__typeName = 'Serene1.Administration.LanguageForm';
	global.Serene1.Administration.LanguageForm = $Serene1_Administration_LanguageForm;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Administration.LanguageGrid
	var $Serene1_Administration_LanguageGrid = function(container) {
		Serenity.EntityGrid.call(this, container);
	};
	$Serene1_Administration_LanguageGrid.__typeName = 'Serene1.Administration.LanguageGrid';
	global.Serene1.Administration.LanguageGrid = $Serene1_Administration_LanguageGrid;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Administration.PermissionCheckEditor
	var $Serene1_Administration_PermissionCheckEditor = function(div, opt) {
		this.$containsText = null;
		this.$byParentKey = null;
		this.$rolePermissions = null;
		Serenity.DataGrid.call(this, div, opt);
		this.$rolePermissions = {};
		var titleByKey = {};
		var permissionKeys = this.$getSortedGroupAndPermissionKeys(titleByKey);
		var items = [];
		for (var $t1 = 0; $t1 < permissionKeys.length; $t1++) {
			var key = permissionKeys[$t1];
			items.push({ Key: key, ParentKey: this.$getParentKey(key), Title: titleByKey.$[key], GrantRevoke: null, IsGroup: ss.endsWithString(key, ':') });
		}
		this.$byParentKey = Enumerable.from(items).toLookup(function(x) {
			return x.ParentKey;
		});
		this.$setItems(items);
	};
	$Serene1_Administration_PermissionCheckEditor.__typeName = 'Serene1.Administration.PermissionCheckEditor';
	global.Serene1.Administration.PermissionCheckEditor = $Serene1_Administration_PermissionCheckEditor;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Administration.PermissionModuleEditor
	var $Serene1_Administration_PermissionModuleEditor = function(hidden) {
		Serenity.Select2Editor.call(this, hidden, null);
		var modules = {};
		var permissions = Q.getRemoteData('Administration.PermissionKeys').Entities;
		for (var i = 0; i < permissions.length; i++) {
			var k = permissions[i];
			var idx1 = k.indexOf(String.fromCharCode(58));
			if (idx1 <= 0) {
				continue;
			}
			var idx2 = k.indexOf(String.fromCharCode(58), idx1 + 1);
			if (idx2 <= 0) {
				continue;
			}
			var module = k.substr(0, idx1);
			modules[module] = true;
		}
		var othersModule = false;
		for (var $t1 = 0; $t1 < permissions.length; $t1++) {
			var k1 = permissions[$t1];
			var idx11 = k1.indexOf(String.fromCharCode(58));
			if (idx11 < 0 && !ss.isValue(modules[k1])) {
				othersModule = true;
				break;
			}
		}
		var moduleList = [];
		ss.arrayAddRange(moduleList, Object.keys(modules));
		if (othersModule) {
			moduleList.push('Common');
		}
		for (var $t2 = 0; $t2 < moduleList.length; $t2++) {
			var k2 = moduleList[$t2];
			this.addItem$1(k2, k2, k2, false);
		}
	};
	$Serene1_Administration_PermissionModuleEditor.__typeName = 'Serene1.Administration.PermissionModuleEditor';
	global.Serene1.Administration.PermissionModuleEditor = $Serene1_Administration_PermissionModuleEditor;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Administration.RoleCheckEditor
	var $Serene1_Administration_RoleCheckEditor = function(div) {
		this.$containsText = null;
		Serenity.CheckTreeEditor.call(this, div, null);
	};
	$Serene1_Administration_RoleCheckEditor.__typeName = 'Serene1.Administration.RoleCheckEditor';
	global.Serene1.Administration.RoleCheckEditor = $Serene1_Administration_RoleCheckEditor;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Administration.RoleForm
	var $Serene1_Administration_RoleForm = function(idPrefix) {
		this.$3$RoleNameField = null;
		Serenity.PrefixedContext.call(this, idPrefix);
	};
	$Serene1_Administration_RoleForm.__typeName = 'Serene1.Administration.RoleForm';
	global.Serene1.Administration.RoleForm = $Serene1_Administration_RoleForm;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Administration.RolePermissionDialog
	var $Serene1_Administration_RolePermissionDialog = function(opt) {
		this.$permissions = null;
		Serenity.TemplatedDialog.call(this, opt);
		this.$permissions = new $Serene1_Administration_PermissionCheckEditor(this.ById('Permissions'), { showRevoke: false });
		Q.serviceRequest('Administration/RolePermission/List', { RoleID: this.options.roleID, Module: null, Submodule: null }, ss.mkdel(this, function(response) {
			this.$permissions.set_value(Enumerable.from(response.Entities).select(function(x) {
				return { PermissionKey: x };
			}).toArray());
		}), null);
	};
	$Serene1_Administration_RolePermissionDialog.__typeName = 'Serene1.Administration.RolePermissionDialog';
	global.Serene1.Administration.RolePermissionDialog = $Serene1_Administration_RolePermissionDialog;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Administration.TranslationGrid
	var $Serene1_Administration_TranslationGrid = function(container) {
		this.$searchText = null;
		this.$sourceLanguage = null;
		this.$targetLanguage = null;
		this.$targetLanguageKey = null;
		this.$hasChanges = false;
		Serenity.EntityGrid.call(this, container);
		this.element.on('keyup.' + this.uniqueName + ' change.' + this.uniqueName, 'input.custom-text', ss.mkdel(this, function(e) {
			var value = Q.trimToNull($(e.target).val());
			if (value === '') {
				value = null;
			}
			this.view.getItemById($(e.target).data('key')).CustomText = value;
			this.$hasChanges = true;
		}));
	};
	$Serene1_Administration_TranslationGrid.__typeName = 'Serene1.Administration.TranslationGrid';
	global.Serene1.Administration.TranslationGrid = $Serene1_Administration_TranslationGrid;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Administration.UserForm
	var $Serene1_Administration_UserForm = function(idPrefix) {
		this.$3$UsernameField = null;
		this.$3$DisplayNameField = null;
		this.$3$EmailField = null;
		this.$3$PasswordField = null;
		this.$3$PasswordConfirmField = null;
		this.$3$SourceField = null;
		Serenity.PrefixedContext.call(this, idPrefix);
	};
	$Serene1_Administration_UserForm.__typeName = 'Serene1.Administration.UserForm';
	global.Serene1.Administration.UserForm = $Serene1_Administration_UserForm;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Administration.UserPermissionDialog
	var $Serene1_Administration_UserPermissionDialog = function(opt) {
		this.$permissions = null;
		Serenity.TemplatedDialog.call(this, opt);
		this.$permissions = new $Serene1_Administration_PermissionCheckEditor(this.ById('Permissions'), { showRevoke: true });
		Q.serviceRequest('Administration/UserPermission/List', { UserID: this.options.userID, Module: null, Submodule: null }, ss.mkdel(this, function(response) {
			this.$permissions.set_value(response.Entities);
		}), null);
		Q.serviceRequest('Administration/UserPermission/ListRolePermissions', { UserID: this.options.userID, Module: null, Submodule: null }, ss.mkdel(this, function(response1) {
			this.$permissions.set_rolePermissions(response1.Entities);
		}), null);
	};
	$Serene1_Administration_UserPermissionDialog.__typeName = 'Serene1.Administration.UserPermissionDialog';
	global.Serene1.Administration.UserPermissionDialog = $Serene1_Administration_UserPermissionDialog;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Administration.UserRoleDialog
	var $Serene1_Administration_UserRoleDialog = function(opt) {
		this.$permissions = null;
		Serenity.TemplatedDialog.call(this, opt);
		this.$permissions = new $Serene1_Administration_RoleCheckEditor(this.ById('Roles'));
		Q.serviceRequest('Administration/UserRole/List', { UserID: this.options.userID }, ss.mkdel(this, function(response) {
			this.$permissions.set_value(Enumerable.from(response.Entities).select(function(x) {
				return x.toString();
			}).toArray());
		}), null);
	};
	$Serene1_Administration_UserRoleDialog.__typeName = 'Serene1.Administration.UserRoleDialog';
	global.Serene1.Administration.UserRoleDialog = $Serene1_Administration_UserRoleDialog;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.BasicSamples.CancellableBulkActionGrid
	var $Serene1_BasicSamples_CancellableBulkActionGrid = function(container) {
		this.$rowSelection = null;
		$Serene1_Northwind_OrderGrid.call(this, container);
	};
	$Serene1_BasicSamples_CancellableBulkActionGrid.__typeName = 'Serene1.BasicSamples.CancellableBulkActionGrid';
	global.Serene1.BasicSamples.CancellableBulkActionGrid = $Serene1_BasicSamples_CancellableBulkActionGrid;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.BasicSamples.ChartInDialog
	var $Serene1_BasicSamples_ChartInDialog = function() {
		this.$areaChart = null;
		Serenity.TemplatedDialog.call(this);
	};
	$Serene1_BasicSamples_ChartInDialog.__typeName = 'Serene1.BasicSamples.ChartInDialog';
	$Serene1_BasicSamples_ChartInDialog.initializePage = function() {
		$(function() {
			$('#LaunchDialogButton').click(function(e) {
				(new $Serene1_BasicSamples_ChartInDialog()).dialogOpen();
			});
		});
	};
	global.Serene1.BasicSamples.ChartInDialog = $Serene1_BasicSamples_ChartInDialog;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.BasicSamples.CloneableEntityDialog
	var $Serene1_BasicSamples_CloneableEntityDialog = function() {
		$Serene1_Northwind_ProductDialog.call(this);
	};
	$Serene1_BasicSamples_CloneableEntityDialog.__typeName = 'Serene1.BasicSamples.CloneableEntityDialog';
	global.Serene1.BasicSamples.CloneableEntityDialog = $Serene1_BasicSamples_CloneableEntityDialog;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.BasicSamples.CloneableEntityGrid
	var $Serene1_BasicSamples_CloneableEntityGrid = function(container) {
		$Serene1_Northwind_ProductGrid.call(this, container);
	};
	$Serene1_BasicSamples_CloneableEntityGrid.__typeName = 'Serene1.BasicSamples.CloneableEntityGrid';
	global.Serene1.BasicSamples.CloneableEntityGrid = $Serene1_BasicSamples_CloneableEntityGrid;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.BasicSamples.DefaultValuesInNewGrid
	var $Serene1_BasicSamples_DefaultValuesInNewGrid = function(container) {
		$Serene1_Northwind_OrderGrid.call(this, container);
	};
	$Serene1_BasicSamples_DefaultValuesInNewGrid.__typeName = 'Serene1.BasicSamples.DefaultValuesInNewGrid';
	global.Serene1.BasicSamples.DefaultValuesInNewGrid = $Serene1_BasicSamples_DefaultValuesInNewGrid;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.BasicSamples.FilteredLookupDetailEditor
	var $Serene1_BasicSamples_FilteredLookupDetailEditor = function(container) {
		this.$9$CategoryIDField = null;
		$Serene1_Northwind_OrderDetailsEditor.call(this, container);
	};
	$Serene1_BasicSamples_FilteredLookupDetailEditor.__typeName = 'Serene1.BasicSamples.FilteredLookupDetailEditor';
	global.Serene1.BasicSamples.FilteredLookupDetailEditor = $Serene1_BasicSamples_FilteredLookupDetailEditor;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.BasicSamples.FilteredLookupInDetailDialog
	var $Serene1_BasicSamples_FilteredLookupInDetailDialog = function() {
		this.$form = null;
		Serenity.EntityDialog.call(this);
		this.$form = new $Serene1_BasicSamples_FilteredLookupInDetailForm(this.idPrefix);
		Serenity.WX.change(this.$form.w('CategoryID', Serenity.LookupEditor), ss.mkdel(this, function(e) {
			this.$form.w('DetailList', Serene1.BasicSamples.FilteredLookupDetailEditor).set_categoryID(Q.toId(this.$form.w('CategoryID', Serenity.LookupEditor).get_value()));
		}));
	};
	$Serene1_BasicSamples_FilteredLookupInDetailDialog.__typeName = 'Serene1.BasicSamples.FilteredLookupInDetailDialog';
	global.Serene1.BasicSamples.FilteredLookupInDetailDialog = $Serene1_BasicSamples_FilteredLookupInDetailDialog;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.BasicSamples.FilteredLookupInDetailForm
	var $Serene1_BasicSamples_FilteredLookupInDetailForm = function(idPrefix) {
		this.$3$CustomerIDField = null;
		this.$3$OrderDateField = null;
		this.$3$CategoryIDField = null;
		this.$3$DetailListField = null;
		Serenity.PrefixedContext.call(this, idPrefix);
	};
	$Serene1_BasicSamples_FilteredLookupInDetailForm.__typeName = 'Serene1.BasicSamples.FilteredLookupInDetailForm';
	global.Serene1.BasicSamples.FilteredLookupInDetailForm = $Serene1_BasicSamples_FilteredLookupInDetailForm;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.BasicSamples.FilteredLookupInDetailGrid
	var $Serene1_BasicSamples_FilteredLookupInDetailGrid = function(container) {
		$Serene1_Northwind_OrderGrid.call(this, container);
	};
	$Serene1_BasicSamples_FilteredLookupInDetailGrid.__typeName = 'Serene1.BasicSamples.FilteredLookupInDetailGrid';
	global.Serene1.BasicSamples.FilteredLookupInDetailGrid = $Serene1_BasicSamples_FilteredLookupInDetailGrid;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.BasicSamples.FilteredLookupOrderDetailDialog
	var $Serene1_BasicSamples_FilteredLookupOrderDetailDialog = function() {
		this.$10$CategoryIDField = null;
		$Serene1_Northwind_OrderDetailDialog.call(this);
		// we can set cascade field in constructor
		// we could also use FilterField but in this case, when CategoryID is null
		// lookup editor would show all products in any category
		this.form.w('ProductID', Serenity.LookupEditor).set_cascadeField('CategoryID');
		// but CategoryID value is not yet available here as detail editor will set it 
		// after calling constructor (creating a detail dialog) so we'll use BeforeLoadEntity
	};
	$Serene1_BasicSamples_FilteredLookupOrderDetailDialog.__typeName = 'Serene1.BasicSamples.FilteredLookupOrderDetailDialog';
	global.Serene1.BasicSamples.FilteredLookupOrderDetailDialog = $Serene1_BasicSamples_FilteredLookupOrderDetailDialog;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.BasicSamples.GridFilteredByCriteria
	var $Serene1_BasicSamples_GridFilteredByCriteria = function(container) {
		$Serene1_Northwind_ProductGrid.call(this, container);
	};
	$Serene1_BasicSamples_GridFilteredByCriteria.__typeName = 'Serene1.BasicSamples.GridFilteredByCriteria';
	global.Serene1.BasicSamples.GridFilteredByCriteria = $Serene1_BasicSamples_GridFilteredByCriteria;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.BasicSamples.GroupingAndSummariesInGrid
	var $Serene1_BasicSamples_GroupingAndSummariesInGrid = function(container) {
		$Serene1_Northwind_ProductGrid.call(this, container);
	};
	$Serene1_BasicSamples_GroupingAndSummariesInGrid.__typeName = 'Serene1.BasicSamples.GroupingAndSummariesInGrid';
	global.Serene1.BasicSamples.GroupingAndSummariesInGrid = $Serene1_BasicSamples_GroupingAndSummariesInGrid;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.BasicSamples.LookupFilterByMultipleDialog
	var $Serene1_BasicSamples_LookupFilterByMultipleDialog = function() {
		$Serene1_Northwind_ProductDialog.call(this);
	};
	$Serene1_BasicSamples_LookupFilterByMultipleDialog.__typeName = 'Serene1.BasicSamples.LookupFilterByMultipleDialog';
	global.Serene1.BasicSamples.LookupFilterByMultipleDialog = $Serene1_BasicSamples_LookupFilterByMultipleDialog;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.BasicSamples.LookupFilterByMultipleForm
	var $Serene1_BasicSamples_LookupFilterByMultipleForm = function(idPrefix) {
		this.$3$ProductNameField = null;
		this.$3$ProductImageField = null;
		this.$3$DiscontinuedField = null;
		this.$3$SupplierIDField = null;
		this.$3$CategoryIDField = null;
		this.$3$QuantityPerUnitField = null;
		this.$3$UnitPriceField = null;
		this.$3$UnitsInStockField = null;
		this.$3$UnitsOnOrderField = null;
		this.$3$ReorderLevelField = null;
		Serenity.PrefixedContext.call(this, idPrefix);
	};
	$Serene1_BasicSamples_LookupFilterByMultipleForm.__typeName = 'Serene1.BasicSamples.LookupFilterByMultipleForm';
	global.Serene1.BasicSamples.LookupFilterByMultipleForm = $Serene1_BasicSamples_LookupFilterByMultipleForm;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.BasicSamples.LookupFilterByMultipleGrid
	var $Serene1_BasicSamples_LookupFilterByMultipleGrid = function(container) {
		$Serene1_Northwind_ProductGrid.call(this, container);
	};
	$Serene1_BasicSamples_LookupFilterByMultipleGrid.__typeName = 'Serene1.BasicSamples.LookupFilterByMultipleGrid';
	global.Serene1.BasicSamples.LookupFilterByMultipleGrid = $Serene1_BasicSamples_LookupFilterByMultipleGrid;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.BasicSamples.MultiColumnDialog
	var $Serene1_BasicSamples_MultiColumnDialog = function() {
		$Serene1_Northwind_OrderDialog.call(this);
		// as these editors are in a three column line, 
		// all should grow 0.5px when dialog grows 1px
		Serenity.FLX.flexXFactor(this.form.w('OrderDate', Serenity.DateEditor).element, 0.5);
		Serenity.FLX.flexXFactor(this.form.w('RequiredDate', Serenity.DateEditor).element, 0.5);
		Serenity.FLX.flexXFactor(this.form.w('ShipName', Serenity.StringEditor).element, 0.5);
		Serenity.FLX.flexXFactor(this.form.w('ShipCity', Serenity.StringEditor).element, 0.5);
		Serenity.FLX.flexXFactor(this.form.w('ShipPostalCode', Serenity.StringEditor).element, 0.5);
		Serenity.FLX.flexXFactor(this.form.w('ShipAddress', Serenity.StringEditor).element, 0.5);
		Serenity.FLX.flexXFactor(this.form.w('ShipRegion', Serenity.StringEditor).element, 0.5);
		Serenity.FLX.flexXFactor(this.form.w('ShipCountry', Serenity.StringEditor).element, 0.5);
		// as these editors are in a three column line, 
		// all should grow 0.33px when dialog grows 1px
		Serenity.FLX.flexXFactor(this.form.w('ShippedDate', Serenity.DateEditor).element, 0.33);
		Serenity.FLX.flexXFactor(this.form.w('ShipVia', Serenity.LookupEditor).element.siblings('.select2-container'), 0.33);
		Serenity.FLX.flexXFactor(this.form.w('Freight', Serenity.DecimalEditor).element, 0.33);
		// grid should grow in height and width when dialog grows
		Serenity.FLX.flexWidthHeight(this.form.w('DetailList', Serene1.Northwind.OrderDetailsEditor).element, 1, 1);
	};
	$Serene1_BasicSamples_MultiColumnDialog.__typeName = 'Serene1.BasicSamples.MultiColumnDialog';
	global.Serene1.BasicSamples.MultiColumnDialog = $Serene1_BasicSamples_MultiColumnDialog;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.BasicSamples.MultiColumnGrid
	var $Serene1_BasicSamples_MultiColumnGrid = function(container) {
		$Serene1_Northwind_OrderGrid.call(this, container);
	};
	$Serene1_BasicSamples_MultiColumnGrid.__typeName = 'Serene1.BasicSamples.MultiColumnGrid';
	global.Serene1.BasicSamples.MultiColumnGrid = $Serene1_BasicSamples_MultiColumnGrid;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.BasicSamples.MultiColumnResponsiveDialog
	var $Serene1_BasicSamples_MultiColumnResponsiveDialog = function() {
		$Serene1_Northwind_OrderDialog.call(this);
	};
	$Serene1_BasicSamples_MultiColumnResponsiveDialog.__typeName = 'Serene1.BasicSamples.MultiColumnResponsiveDialog';
	global.Serene1.BasicSamples.MultiColumnResponsiveDialog = $Serene1_BasicSamples_MultiColumnResponsiveDialog;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.BasicSamples.MultiColumnResponsiveGrid
	var $Serene1_BasicSamples_MultiColumnResponsiveGrid = function(container) {
		$Serene1_Northwind_OrderGrid.call(this, container);
	};
	$Serene1_BasicSamples_MultiColumnResponsiveGrid.__typeName = 'Serene1.BasicSamples.MultiColumnResponsiveGrid';
	global.Serene1.BasicSamples.MultiColumnResponsiveGrid = $Serene1_BasicSamples_MultiColumnResponsiveGrid;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.BasicSamples.OrderBulkAction
	var $Serene1_BasicSamples_OrderBulkAction = function() {
		$Serene1_BulkServiceAction.call(this);
	};
	$Serene1_BasicSamples_OrderBulkAction.__typeName = 'Serene1.BasicSamples.OrderBulkAction';
	global.Serene1.BasicSamples.OrderBulkAction = $Serene1_BasicSamples_OrderBulkAction;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.BasicSamples.ProduceSeafoodCategoryEditor
	var $Serene1_BasicSamples_ProduceSeafoodCategoryEditor = function(hidden, opt) {
		Serenity.LookupEditorBase.call(this, hidden, opt);
	};
	$Serene1_BasicSamples_ProduceSeafoodCategoryEditor.__typeName = 'Serene1.BasicSamples.ProduceSeafoodCategoryEditor';
	global.Serene1.BasicSamples.ProduceSeafoodCategoryEditor = $Serene1_BasicSamples_ProduceSeafoodCategoryEditor;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.BasicSamples.ResponsiveDialog
	var $Serene1_BasicSamples_ResponsiveDialog = function() {
		Serenity.EntityDialog.call(this);
	};
	$Serene1_BasicSamples_ResponsiveDialog.__typeName = 'Serene1.BasicSamples.ResponsiveDialog';
	global.Serene1.BasicSamples.ResponsiveDialog = $Serene1_BasicSamples_ResponsiveDialog;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.BasicSamples.ResponsiveGrid
	var $Serene1_BasicSamples_ResponsiveGrid = function(container) {
		$Serene1_Northwind_OrderGrid.call(this, container);
	};
	$Serene1_BasicSamples_ResponsiveGrid.__typeName = 'Serene1.BasicSamples.ResponsiveGrid';
	global.Serene1.BasicSamples.ResponsiveGrid = $Serene1_BasicSamples_ResponsiveGrid;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.BasicSamples.ViewWithoutIDGrid
	var $Serene1_BasicSamples_ViewWithoutIDGrid = function(container) {
		this.$nextId = 1;
		Serenity.EntityGrid.call(this, container);
	};
	$Serene1_BasicSamples_ViewWithoutIDGrid.__typeName = 'Serene1.BasicSamples.ViewWithoutIDGrid';
	global.Serene1.BasicSamples.ViewWithoutIDGrid = $Serene1_BasicSamples_ViewWithoutIDGrid;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Common.ExcelExportHelper
	var $Serene1_Common_ExcelExportHelper = function() {
	};
	$Serene1_Common_ExcelExportHelper.__typeName = 'Serene1.Common.ExcelExportHelper';
	$Serene1_Common_ExcelExportHelper.createToolButton = function(grid, service, onViewSubmit, title) {
		return {
			title: title,
			cssClass: 'export-xlsx-button',
			onClick: function() {
				if (!onViewSubmit()) {
					return;
				}
				var request = Q.deepClone(grid.getView().params);
				request.Take = 0;
				request.Skip = 0;
				var sortBy = grid.getView().sortBy;
				if (ss.isValue(sortBy)) {
					request.Sort = sortBy;
				}
				request.IncludeColumns = [];
				var $t1 = grid.getGrid().getColumns();
				for (var $t2 = 0; $t2 < $t1.length; $t2++) {
					var column = $t1[$t2];
					var $t4 = request.IncludeColumns;
					var $t3 = column.id;
					if (ss.isNullOrUndefined($t3)) {
						$t3 = column.field;
					}
					$t4.push($t3);
				}
				Q.postToService({ service: service, request: request, target: '_blank' });
			}
		};
	};
	global.Serene1.Common.ExcelExportHelper = $Serene1_Common_ExcelExportHelper;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Common.GridEditorBase
	var $Serene1_Common_GridEditorBase = function(container) {
		this.$nextId = 1;
		Serenity.EntityGrid.call(this, container);
	};
	$Serene1_Common_GridEditorBase.__typeName = 'Serene1.Common.GridEditorBase';
	global.Serene1.Common.GridEditorBase = $Serene1_Common_GridEditorBase;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Common.GridEditorDialog
	var $Serene1_Common_GridEditorDialog = function() {
		this.$8$OnSaveField = null;
		this.$8$OnDeleteField = null;
		Serenity.EntityDialog.call(this);
	};
	$Serene1_Common_GridEditorDialog.__typeName = 'Serene1.Common.GridEditorDialog';
	global.Serene1.Common.GridEditorDialog = $Serene1_Common_GridEditorDialog;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Common.LanguageSelection
	var $Serene1_Common_LanguageSelection = function(select, currentLanguage) {
		Serenity.Widget.call(this, select, null);
		currentLanguage = ss.coalesce(currentLanguage, 'en');
		var self = this;
		Serenity.WX.change(this, function(e) {
			$.cookie('LanguagePreference', select.val(), { path: Q.Config.applicationPath, expires: 365 });
			window.location.reload(true);
		});
		Q.getLookupAsync('Administration.Language').then(function(x) {
			if (!Enumerable.from(x.get_items()).any(function(z) {
				return ss.referenceEquals(z.LanguageId, currentLanguage);
			})) {
				var idx = currentLanguage.lastIndexOf('-');
				if (idx >= 0) {
					currentLanguage = currentLanguage.substr(0, idx);
					if (!Enumerable.from(x.get_items()).any(function(z1) {
						return ss.referenceEquals(z1.LanguageId, currentLanguage);
					})) {
						currentLanguage = 'en';
					}
				}
				else {
					currentLanguage = 'en';
				}
			}
			var $t1 = x.get_items();
			for (var $t2 = 0; $t2 < $t1.length; $t2++) {
				var l = $t1[$t2];
				Q.addOption(select, l.LanguageId, l.LanguageName);
			}
			select.val(currentLanguage);
		}, null);
	};
	$Serene1_Common_LanguageSelection.__typeName = 'Serene1.Common.LanguageSelection';
	global.Serene1.Common.LanguageSelection = $Serene1_Common_LanguageSelection;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Common.ReportHelper
	var $Serene1_Common_ReportHelper = function() {
	};
	$Serene1_Common_ReportHelper.__typeName = 'Serene1.Common.ReportHelper';
	$Serene1_Common_ReportHelper.createRenderButton = function(reportKey, title, cssClass, extension, options) {
		return {
			title: title,
			cssClass: cssClass,
			onClick: function() {
				Q.postToUrl({ url: '~/Report/Render', params: { key: reportKey, ext: extension, opt: (ss.staticEquals(options, null) ? '' : $.toJSON(options())) }, target: '_blank' });
			}
		};
	};
	global.Serene1.Common.ReportHelper = $Serene1_Common_ReportHelper;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Common.SidebarSearch
	var $Serene1_Common_SidebarSearch = function(input, menuUL) {
		this.$menuUL = null;
		Serenity.Widget.call(this, input, null);
		var self = this;
		var $t1 = Serenity.QuickSearchInputOptions.$ctor();
		$t1.onSearch = function(field, text, success) {
			self.$updateMatchFlags(text);
			success(true);
		};
		new Serenity.QuickSearchInput(input, $t1);
		this.$menuUL = menuUL;
	};
	$Serene1_Common_SidebarSearch.__typeName = 'Serene1.Common.SidebarSearch';
	global.Serene1.Common.SidebarSearch = $Serene1_Common_SidebarSearch;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Common.ThemeSelection
	var $Serene1_Common_ThemeSelection = function(select) {
		Serenity.Widget.call(this, select, null);
		var self = this;
		Serenity.WX.change(this, ss.mkdel(this, function(e) {
			$.cookie('ThemePreference', select.val(), { path: Q.Config.applicationPath, expires: 365 });
			$('body').removeClass('skin-' + this.$getCurrentTheme());
			$('body').addClass('skin-' + select.val());
		}));
		Q.addOption(select, 'blue', Q.text('Site.Layout.ThemeBlue'));
		Q.addOption(select, 'blue-light', Q.text('Site.Layout.ThemeBlueLight'));
		Q.addOption(select, 'purple', Q.text('Site.Layout.ThemePurple'));
		Q.addOption(select, 'purple-light', Q.text('Site.Layout.ThemePurpleLight'));
		Q.addOption(select, 'red', Q.text('Site.Layout.ThemeRed'));
		Q.addOption(select, 'red-light', Q.text('Site.Layout.ThemeRedLight'));
		Q.addOption(select, 'green', Q.text('Site.Layout.ThemeGreen'));
		Q.addOption(select, 'green-light', Q.text('Site.Layout.ThemeGreenLight'));
		Q.addOption(select, 'yellow', Q.text('Site.Layout.ThemeYellow'));
		Q.addOption(select, 'yellow-light', Q.text('Site.Layout.ThemeYellowLight'));
		Q.addOption(select, 'black', Q.text('Site.Layout.ThemeBlack'));
		Q.addOption(select, 'black-light', Q.text('Site.Layout.ThemeBlackLight'));
		select.val(this.$getCurrentTheme());
	};
	$Serene1_Common_ThemeSelection.__typeName = 'Serene1.Common.ThemeSelection';
	global.Serene1.Common.ThemeSelection = $Serene1_Common_ThemeSelection;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Membership.ChangePasswordForm
	var $Serene1_Membership_ChangePasswordForm = function(idPrefix) {
		this.$3$OldPasswordField = null;
		this.$3$NewPasswordField = null;
		this.$3$ConfirmPasswordField = null;
		Serenity.PrefixedContext.call(this, idPrefix);
	};
	$Serene1_Membership_ChangePasswordForm.__typeName = 'Serene1.Membership.ChangePasswordForm';
	global.Serene1.Membership.ChangePasswordForm = $Serene1_Membership_ChangePasswordForm;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Membership.ChangePasswordPanel
	var $Serene1_Membership_ChangePasswordPanel = function(container) {
		this.$form = null;
		Serenity.PropertyPanel.call(this, container);
		this.$form = new $Serene1_Membership_ChangePasswordForm(this.idPrefix);
		this.$form.w('NewPassword', Serenity.PasswordEditor).addValidationRule(this.uniqueName, ss.mkdel(this, function(e) {
			if (this.$form.w('ConfirmPassword', Serenity.PasswordEditor).get_value().length < 7) {
				return ss.formatString(Q.text('Validation.MinRequiredPasswordLength'), 7);
			}
			return null;
		}));
		this.$form.w('ConfirmPassword', Serenity.PasswordEditor).addValidationRule(this.uniqueName, ss.mkdel(this, function(e1) {
			if (!ss.referenceEquals(this.$form.w('ConfirmPassword', Serenity.PasswordEditor).get_value(), this.$form.w('NewPassword', Serenity.PasswordEditor).get_value())) {
				return Q.text('Validation.PasswordConfirm');
			}
			return null;
		}));
		this.ById('SubmitButton').click(ss.thisFix(ss.mkdel(this, function(s, e2) {
			e2.preventDefault();
			if (!this.validateForm()) {
				return;
			}
			var request = this.getSaveEntity();
			Q.serviceCall({
				url: Q.resolveUrl('~/Account/ChangePassword'),
				request: request,
				onSuccess: function(response) {
					Q.information(Q.text('Forms.Membership.ChangePassword.Success'), function() {
						window.location.href = Q.resolveUrl('~/');
					}, {});
				}
			});
		})));
	};
	$Serene1_Membership_ChangePasswordPanel.__typeName = 'Serene1.Membership.ChangePasswordPanel';
	global.Serene1.Membership.ChangePasswordPanel = $Serene1_Membership_ChangePasswordPanel;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Membership.ForgotPasswordForm
	var $Serene1_Membership_ForgotPasswordForm = function(idPrefix) {
		this.$3$EmailField = null;
		Serenity.PrefixedContext.call(this, idPrefix);
	};
	$Serene1_Membership_ForgotPasswordForm.__typeName = 'Serene1.Membership.ForgotPasswordForm';
	global.Serene1.Membership.ForgotPasswordForm = $Serene1_Membership_ForgotPasswordForm;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Membership.ForgotPasswordPanel
	var $Serene1_Membership_ForgotPasswordPanel = function(container) {
		Serenity.PropertyPanel.call(this, container);
		this.ById('SubmitButton').click(ss.thisFix(ss.mkdel(this, function(s, e) {
			e.preventDefault();
			if (!this.validateForm()) {
				return;
			}
			var request = this.getSaveEntity();
			Q.serviceCall({
				url: Q.resolveUrl('~/Account/ForgotPassword'),
				request: request,
				onSuccess: function(response) {
					Q.information(Q.text('Forms.Membership.ForgotPassword.Success'), function() {
						window.location.href = Q.resolveUrl('~/');
					}, {});
				}
			});
		})));
	};
	$Serene1_Membership_ForgotPasswordPanel.__typeName = 'Serene1.Membership.ForgotPasswordPanel';
	global.Serene1.Membership.ForgotPasswordPanel = $Serene1_Membership_ForgotPasswordPanel;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Membership.LoginForm
	var $Serene1_Membership_LoginForm = function(idPrefix) {
		this.$3$UsernameField = null;
		this.$3$PasswordField = null;
		Serenity.PrefixedContext.call(this, idPrefix);
	};
	$Serene1_Membership_LoginForm.__typeName = 'Serene1.Membership.LoginForm';
	global.Serene1.Membership.LoginForm = $Serene1_Membership_LoginForm;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Membership.LoginPanel
	var $Serene1_Membership_LoginPanel = function(container) {
		Serenity.PropertyPanel.call(this, container);
		this.ById('LoginButton').click(ss.thisFix(ss.mkdel(this, function(s, e) {
			e.preventDefault();
			if (!this.validateForm()) {
				return;
			}
			var request = this.getSaveEntity();
			Q.serviceCall({
				url: Q.resolveUrl('~/Account/Login'),
				request: request,
				onSuccess: function(response) {
					var q = Q.parseQueryString();
					var $t1 = q['returnUrl'];
					if (ss.isNullOrUndefined($t1)) {
						$t1 = q['ReturnUrl'];
					}
					var r = $t1;
					if (!ss.isNullOrEmptyString(r)) {
						window.location.href = r;
					}
					else {
						window.location.href = Q.resolveUrl('~/');
					}
				}
			});
		})));
	};
	$Serene1_Membership_LoginPanel.__typeName = 'Serene1.Membership.LoginPanel';
	global.Serene1.Membership.LoginPanel = $Serene1_Membership_LoginPanel;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Membership.ResetPasswordForm
	var $Serene1_Membership_ResetPasswordForm = function(idPrefix) {
		this.$3$NewPasswordField = null;
		this.$3$ConfirmPasswordField = null;
		Serenity.PrefixedContext.call(this, idPrefix);
	};
	$Serene1_Membership_ResetPasswordForm.__typeName = 'Serene1.Membership.ResetPasswordForm';
	global.Serene1.Membership.ResetPasswordForm = $Serene1_Membership_ResetPasswordForm;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Membership.ResetPasswordPanel
	var $Serene1_Membership_ResetPasswordPanel = function(container) {
		this.$form = null;
		Serenity.PropertyPanel.call(this, container);
		this.$form = new $Serene1_Membership_ResetPasswordForm(this.idPrefix);
		this.$form.w('NewPassword', Serenity.PasswordEditor).addValidationRule(this.uniqueName, ss.mkdel(this, function(e) {
			if (this.$form.w('ConfirmPassword', Serenity.PasswordEditor).get_value().length < 7) {
				return ss.formatString(Q.text('Validation.MinRequiredPasswordLength'), 7);
			}
			return null;
		}));
		this.$form.w('ConfirmPassword', Serenity.PasswordEditor).addValidationRule(this.uniqueName, ss.mkdel(this, function(e1) {
			if (!ss.referenceEquals(this.$form.w('ConfirmPassword', Serenity.PasswordEditor).get_value(), this.$form.w('NewPassword', Serenity.PasswordEditor).get_value())) {
				return Q.text('Validation.PasswordConfirm');
			}
			return null;
		}));
		this.ById('SubmitButton').click(ss.thisFix(ss.mkdel(this, function(s, e2) {
			e2.preventDefault();
			if (!this.validateForm()) {
				return;
			}
			var request = this.getSaveEntity();
			request.Token = this.ById('Token').val();
			Q.serviceCall({
				url: Q.resolveUrl('~/Account/ResetPassword'),
				request: request,
				onSuccess: function(response) {
					Q.information(Q.text('Forms.Membership.ResetPassword.Success'), function() {
						window.location.href = Q.resolveUrl('~/Account/Login');
					}, {});
				}
			});
		})));
	};
	$Serene1_Membership_ResetPasswordPanel.__typeName = 'Serene1.Membership.ResetPasswordPanel';
	global.Serene1.Membership.ResetPasswordPanel = $Serene1_Membership_ResetPasswordPanel;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Membership.SignUpForm
	var $Serene1_Membership_SignUpForm = function(idPrefix) {
		this.$3$DisplayNameField = null;
		this.$3$EmailField = null;
		this.$3$ConfirmEmailField = null;
		this.$3$PasswordField = null;
		this.$3$ConfirmPasswordField = null;
		Serenity.PrefixedContext.call(this, idPrefix);
	};
	$Serene1_Membership_SignUpForm.__typeName = 'Serene1.Membership.SignUpForm';
	global.Serene1.Membership.SignUpForm = $Serene1_Membership_SignUpForm;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Membership.SignUpPanel
	var $Serene1_Membership_SignUpPanel = function(container) {
		this.$form = null;
		Serenity.PropertyPanel.call(this, container);
		this.$form = new $Serene1_Membership_SignUpForm(this.idPrefix);
		this.$form.w('ConfirmPassword', Serenity.PasswordEditor).addValidationRule(this.uniqueName, ss.mkdel(this, function(e) {
			if (!ss.referenceEquals(this.$form.w('ConfirmPassword', Serenity.PasswordEditor).get_value(), this.$form.w('Password', Serenity.PasswordEditor).get_value())) {
				return Q.text('Validation.PasswordConfirm');
			}
			return null;
		}));
		this.$form.w('ConfirmEmail', Serenity.EmailEditor).addValidationRule(this.uniqueName, ss.mkdel(this, function(e1) {
			if (!ss.referenceEquals(this.$form.w('ConfirmEmail', Serenity.EmailEditor).get_value(), this.$form.w('Email', Serenity.EmailEditor).get_value())) {
				return Q.text('Validation.EmailConfirm');
			}
			return null;
		}));
		this.ById('SubmitButton').click(ss.thisFix(ss.mkdel(this, function(s, e2) {
			e2.preventDefault();
			if (!this.validateForm()) {
				return;
			}
			Q.serviceCall({
				url: Q.resolveUrl('~/Account/SignUp'),
				request: { DisplayName: this.$form.w('DisplayName', Serenity.StringEditor).get_value(), Email: this.$form.w('Email', Serenity.EmailEditor).get_value(), Password: this.$form.w('Password', Serenity.PasswordEditor).get_value() },
				onSuccess: function(response) {
					Q.information(Q.text('Forms.Membership.SignUp.Success'), function() {
						window.location.href = Q.resolveUrl('~/');
					}, {});
				}
			});
		})));
	};
	$Serene1_Membership_SignUpPanel.__typeName = 'Serene1.Membership.SignUpPanel';
	global.Serene1.Membership.SignUpPanel = $Serene1_Membership_SignUpPanel;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Northwind.CategoryDialog
	var $Serene1_Northwind_CategoryDialog = function() {
		Serenity.EntityDialog.call(this);
	};
	$Serene1_Northwind_CategoryDialog.__typeName = 'Serene1.Northwind.CategoryDialog';
	global.Serene1.Northwind.CategoryDialog = $Serene1_Northwind_CategoryDialog;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Northwind.CategoryForm
	var $Serene1_Northwind_CategoryForm = function(idPrefix) {
		this.$3$CategoryNameField = null;
		this.$3$DescriptionField = null;
		Serenity.PrefixedContext.call(this, idPrefix);
	};
	$Serene1_Northwind_CategoryForm.__typeName = 'Serene1.Northwind.CategoryForm';
	global.Serene1.Northwind.CategoryForm = $Serene1_Northwind_CategoryForm;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Northwind.CategoryGrid
	var $Serene1_Northwind_CategoryGrid = function(container) {
		Serenity.EntityGrid.call(this, container);
	};
	$Serene1_Northwind_CategoryGrid.__typeName = 'Serene1.Northwind.CategoryGrid';
	global.Serene1.Northwind.CategoryGrid = $Serene1_Northwind_CategoryGrid;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Northwind.CustomerCustomerDemoDialog
	var $Serene1_Northwind_CustomerCustomerDemoDialog = function() {
		Serenity.EntityDialog.call(this);
	};
	$Serene1_Northwind_CustomerCustomerDemoDialog.__typeName = 'Serene1.Northwind.CustomerCustomerDemoDialog';
	global.Serene1.Northwind.CustomerCustomerDemoDialog = $Serene1_Northwind_CustomerCustomerDemoDialog;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Northwind.CustomerCustomerDemoForm
	var $Serene1_Northwind_CustomerCustomerDemoForm = function(idPrefix) {
		this.$3$CustomerIDField = null;
		this.$3$CustomerTypeIDField = null;
		Serenity.PrefixedContext.call(this, idPrefix);
	};
	$Serene1_Northwind_CustomerCustomerDemoForm.__typeName = 'Serene1.Northwind.CustomerCustomerDemoForm';
	global.Serene1.Northwind.CustomerCustomerDemoForm = $Serene1_Northwind_CustomerCustomerDemoForm;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Northwind.CustomerCustomerDemoGrid
	var $Serene1_Northwind_CustomerCustomerDemoGrid = function(container) {
		Serenity.EntityGrid.call(this, container);
	};
	$Serene1_Northwind_CustomerCustomerDemoGrid.__typeName = 'Serene1.Northwind.CustomerCustomerDemoGrid';
	global.Serene1.Northwind.CustomerCustomerDemoGrid = $Serene1_Northwind_CustomerCustomerDemoGrid;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Northwind.CustomerDemographicDialog
	var $Serene1_Northwind_CustomerDemographicDialog = function() {
		Serenity.EntityDialog.call(this);
	};
	$Serene1_Northwind_CustomerDemographicDialog.__typeName = 'Serene1.Northwind.CustomerDemographicDialog';
	global.Serene1.Northwind.CustomerDemographicDialog = $Serene1_Northwind_CustomerDemographicDialog;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Northwind.CustomerDemographicForm
	var $Serene1_Northwind_CustomerDemographicForm = function(idPrefix) {
		this.$3$CustomerTypeIDField = null;
		this.$3$CustomerDescField = null;
		Serenity.PrefixedContext.call(this, idPrefix);
	};
	$Serene1_Northwind_CustomerDemographicForm.__typeName = 'Serene1.Northwind.CustomerDemographicForm';
	global.Serene1.Northwind.CustomerDemographicForm = $Serene1_Northwind_CustomerDemographicForm;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Northwind.CustomerDemographicGrid
	var $Serene1_Northwind_CustomerDemographicGrid = function(container) {
		Serenity.EntityGrid.call(this, container);
	};
	$Serene1_Northwind_CustomerDemographicGrid.__typeName = 'Serene1.Northwind.CustomerDemographicGrid';
	global.Serene1.Northwind.CustomerDemographicGrid = $Serene1_Northwind_CustomerDemographicGrid;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Northwind.CustomerDialog
	var $Serene1_Northwind_CustomerDialog = function() {
		this.$loadedState = null;
		this.$ordersGrid = null;
		Serenity.EntityDialog.call(this);
		this.$ordersGrid = new $Serene1_Northwind_CustomerOrdersGrid(this.ById('OrdersGrid'));
		Serenity.FLX.flexHeightOnly(this.$ordersGrid.element, 1);
		this.ById('NoteList').closest('.field').hide().end().appendTo(this.ById('TabNotes'));
		$Serene1_DialogUtils.pendingChangesConfirmation(this.element, ss.mkdel(this, function() {
			return !ss.referenceEquals(this.$getSaveState(), this.$loadedState);
		}));
		this.tabs.bind('tabsactivate', ss.mkdel(this, function(e, i) {
			this.arrange();
		}));
	};
	$Serene1_Northwind_CustomerDialog.__typeName = 'Serene1.Northwind.CustomerDialog';
	global.Serene1.Northwind.CustomerDialog = $Serene1_Northwind_CustomerDialog;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Northwind.CustomerEditor
	var $Serene1_Northwind_CustomerEditor = function(container, options) {
		Serenity.LookupEditorBase.call(this, container, options);
	};
	$Serene1_Northwind_CustomerEditor.__typeName = 'Serene1.Northwind.CustomerEditor';
	global.Serene1.Northwind.CustomerEditor = $Serene1_Northwind_CustomerEditor;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Northwind.CustomerForm
	var $Serene1_Northwind_CustomerForm = function(idPrefix) {
		this.$3$CustomerIDField = null;
		this.$3$CompanyNameField = null;
		this.$3$ContactNameField = null;
		this.$3$ContactTitleField = null;
		this.$3$RepresentativesField = null;
		this.$3$AddressField = null;
		this.$3$CityField = null;
		this.$3$RegionField = null;
		this.$3$PostalCodeField = null;
		this.$3$CountryField = null;
		this.$3$PhoneField = null;
		this.$3$FaxField = null;
		this.$3$NoteListField = null;
		Serenity.PrefixedContext.call(this, idPrefix);
	};
	$Serene1_Northwind_CustomerForm.__typeName = 'Serene1.Northwind.CustomerForm';
	global.Serene1.Northwind.CustomerForm = $Serene1_Northwind_CustomerForm;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Northwind.CustomerGrid
	var $Serene1_Northwind_CustomerGrid = function(container) {
		Serenity.EntityGrid.call(this, container);
	};
	$Serene1_Northwind_CustomerGrid.__typeName = 'Serene1.Northwind.CustomerGrid';
	global.Serene1.Northwind.CustomerGrid = $Serene1_Northwind_CustomerGrid;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Northwind.CustomerOrderDialog
	var $Serene1_Northwind_CustomerOrderDialog = function() {
		$Serene1_Northwind_OrderDialog.call(this);
	};
	$Serene1_Northwind_CustomerOrderDialog.__typeName = 'Serene1.Northwind.CustomerOrderDialog';
	global.Serene1.Northwind.CustomerOrderDialog = $Serene1_Northwind_CustomerOrderDialog;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Northwind.CustomerOrdersGrid
	var $Serene1_Northwind_CustomerOrdersGrid = function(container) {
		this.$customerID = null;
		$Serene1_Northwind_OrderGrid.call(this, container);
	};
	$Serene1_Northwind_CustomerOrdersGrid.__typeName = 'Serene1.Northwind.CustomerOrdersGrid';
	global.Serene1.Northwind.CustomerOrdersGrid = $Serene1_Northwind_CustomerOrdersGrid;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Northwind.EmployeeDialog
	var $Serene1_Northwind_EmployeeDialog = function() {
		Serenity.EntityDialog.call(this);
	};
	$Serene1_Northwind_EmployeeDialog.__typeName = 'Serene1.Northwind.EmployeeDialog';
	global.Serene1.Northwind.EmployeeDialog = $Serene1_Northwind_EmployeeDialog;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Northwind.EmployeeForm
	var $Serene1_Northwind_EmployeeForm = function(idPrefix) {
		this.$3$LastNameField = null;
		this.$3$FirstNameField = null;
		this.$3$TitleField = null;
		this.$3$TitleOfCourtesyField = null;
		this.$3$BirthDateField = null;
		this.$3$HireDateField = null;
		this.$3$AddressField = null;
		this.$3$CityField = null;
		this.$3$RegionField = null;
		this.$3$PostalCodeField = null;
		this.$3$CountryField = null;
		this.$3$HomePhoneField = null;
		this.$3$ExtensionField = null;
		this.$3$PhotoField = null;
		this.$3$NotesField = null;
		this.$3$ReportsToField = null;
		this.$3$PhotoPathField = null;
		Serenity.PrefixedContext.call(this, idPrefix);
	};
	$Serene1_Northwind_EmployeeForm.__typeName = 'Serene1.Northwind.EmployeeForm';
	global.Serene1.Northwind.EmployeeForm = $Serene1_Northwind_EmployeeForm;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Northwind.EmployeeFormatter
	var $Serene1_Northwind_EmployeeFormatter = function() {
		this.$1$GenderPropertyField = null;
	};
	$Serene1_Northwind_EmployeeFormatter.__typeName = 'Serene1.Northwind.EmployeeFormatter';
	global.Serene1.Northwind.EmployeeFormatter = $Serene1_Northwind_EmployeeFormatter;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Northwind.EmployeeGrid
	var $Serene1_Northwind_EmployeeGrid = function(container) {
		Serenity.EntityGrid.call(this, container);
	};
	$Serene1_Northwind_EmployeeGrid.__typeName = 'Serene1.Northwind.EmployeeGrid';
	global.Serene1.Northwind.EmployeeGrid = $Serene1_Northwind_EmployeeGrid;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Northwind.EmployeeTerritoryDialog
	var $Serene1_Northwind_EmployeeTerritoryDialog = function() {
		Serenity.EntityDialog.call(this);
	};
	$Serene1_Northwind_EmployeeTerritoryDialog.__typeName = 'Serene1.Northwind.EmployeeTerritoryDialog';
	global.Serene1.Northwind.EmployeeTerritoryDialog = $Serene1_Northwind_EmployeeTerritoryDialog;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Northwind.EmployeeTerritoryForm
	var $Serene1_Northwind_EmployeeTerritoryForm = function(idPrefix) {
		this.$3$TerritoryIDField = null;
		Serenity.PrefixedContext.call(this, idPrefix);
	};
	$Serene1_Northwind_EmployeeTerritoryForm.__typeName = 'Serene1.Northwind.EmployeeTerritoryForm';
	global.Serene1.Northwind.EmployeeTerritoryForm = $Serene1_Northwind_EmployeeTerritoryForm;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Northwind.EmployeeTerritoryGrid
	var $Serene1_Northwind_EmployeeTerritoryGrid = function(container) {
		Serenity.EntityGrid.call(this, container);
	};
	$Serene1_Northwind_EmployeeTerritoryGrid.__typeName = 'Serene1.Northwind.EmployeeTerritoryGrid';
	global.Serene1.Northwind.EmployeeTerritoryGrid = $Serene1_Northwind_EmployeeTerritoryGrid;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Northwind.FreightFormatter
	var $Serene1_Northwind_FreightFormatter = function() {
	};
	$Serene1_Northwind_FreightFormatter.__typeName = 'Serene1.Northwind.FreightFormatter';
	global.Serene1.Northwind.FreightFormatter = $Serene1_Northwind_FreightFormatter;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Northwind.Gender
	var $Serene1_Northwind_Gender = function() {
	};
	$Serene1_Northwind_Gender.__typeName = 'Serene1.Northwind.Gender';
	global.Serene1.Northwind.Gender = $Serene1_Northwind_Gender;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Northwind.NoteDialog
	var $Serene1_Northwind_NoteDialog = function() {
		this.okClick = null;
		Serenity.TemplatedDialog.call(this);
		var $t2 = this.ById('Text');
		var $t1 = Serenity.HtmlContentEditorOptions.$ctor();
		$t1.rows = 12;
		new $Serenity_HtmlBasicContentEditor($t2, $t1);
	};
	$Serene1_Northwind_NoteDialog.__typeName = 'Serene1.Northwind.NoteDialog';
	global.Serene1.Northwind.NoteDialog = $Serene1_Northwind_NoteDialog;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Northwind.NotesEditor
	var $Serene1_Northwind_NotesEditor = function(container) {
		this.$items = null;
		this.$6$IsDirtyField = false;
		this.$6$OnChangeField = null;
		Serenity.TemplatedWidget.call(this, container);
		var $t2 = this.ById('Toolbar');
		var $t1 = [];
		$t1.push({ title: 'Add Note', cssClass: 'add-button', onClick: ss.mkdel(this, function(e) {
			e.preventDefault();
			this.$addClick();
		}) });
		new Serenity.Toolbar($t2, { buttons: $t1 });
	};
	$Serene1_Northwind_NotesEditor.__typeName = 'Serene1.Northwind.NotesEditor';
	global.Serene1.Northwind.NotesEditor = $Serene1_Northwind_NotesEditor;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Northwind.OrderDetailDialog
	var $Serene1_Northwind_OrderDetailDialog = function() {
		this.form = null;
		$Serene1_Common_GridEditorDialog.call(this);
		this.form = new $Serene1_Northwind_OrderDetailForm(this.idPrefix);
		Serenity.WX.changeSelect2(this.form.w('ProductID', Serenity.LookupEditor), ss.mkdel(this, function(e) {
			var productID = Q.toId(this.form.w('ProductID', Serenity.LookupEditor).get_value());
			if (ss.isValue(productID)) {
				this.form.w('UnitPrice', Serenity.DecimalEditor).set_value(Q.getLookup('Northwind.Product').get_itemById()[ss.unbox(productID)].UnitPrice);
			}
		}));
		this.form.w('Discount', Serenity.DecimalEditor).addValidationRule(this.uniqueName, ss.mkdel(this, function(e1) {
			if (ss.isValue(this.form.w('UnitPrice', Serenity.DecimalEditor).get_value()) && ss.isValue(this.form.w('Quantity', Serenity.IntegerEditor).get_value$1()) && ss.isValue(this.form.w('Discount', Serenity.DecimalEditor).get_value()) && ss.unbox(this.form.w('Discount', Serenity.DecimalEditor).get_value()) > 0 && ss.unbox(this.form.w('Discount', Serenity.DecimalEditor).get_value()) > ss.unbox(this.form.w('UnitPrice', Serenity.DecimalEditor).get_value()) * ss.unbox(this.form.w('Quantity', Serenity.IntegerEditor).get_value$1())) {
				return "Discount can't be higher than total price!";
			}
			return null;
		}));
	};
	$Serene1_Northwind_OrderDetailDialog.__typeName = 'Serene1.Northwind.OrderDetailDialog';
	global.Serene1.Northwind.OrderDetailDialog = $Serene1_Northwind_OrderDetailDialog;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Northwind.OrderDetailForm
	var $Serene1_Northwind_OrderDetailForm = function(idPrefix) {
		this.$3$ProductIDField = null;
		this.$3$UnitPriceField = null;
		this.$3$QuantityField = null;
		this.$3$DiscountField = null;
		Serenity.PrefixedContext.call(this, idPrefix);
	};
	$Serene1_Northwind_OrderDetailForm.__typeName = 'Serene1.Northwind.OrderDetailForm';
	global.Serene1.Northwind.OrderDetailForm = $Serene1_Northwind_OrderDetailForm;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Northwind.OrderDetailsEditor
	var $Serene1_Northwind_OrderDetailsEditor = function(container) {
		$Serene1_Common_GridEditorBase.call(this, container);
	};
	$Serene1_Northwind_OrderDetailsEditor.__typeName = 'Serene1.Northwind.OrderDetailsEditor';
	global.Serene1.Northwind.OrderDetailsEditor = $Serene1_Northwind_OrderDetailsEditor;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Northwind.OrderDialog
	var $Serene1_Northwind_OrderDialog = function() {
		this.form = null;
		Serenity.EntityDialog.call(this);
		this.form = new $Serene1_Northwind_OrderForm(this.idPrefix);
	};
	$Serene1_Northwind_OrderDialog.__typeName = 'Serene1.Northwind.OrderDialog';
	global.Serene1.Northwind.OrderDialog = $Serene1_Northwind_OrderDialog;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Northwind.OrderForm
	var $Serene1_Northwind_OrderForm = function(idPrefix) {
		this.$3$CustomerIDField = null;
		this.$3$OrderDateField = null;
		this.$3$RequiredDateField = null;
		this.$3$EmployeeIDField = null;
		this.$3$DetailListField = null;
		this.$3$ShippedDateField = null;
		this.$3$ShipViaField = null;
		this.$3$FreightField = null;
		this.$3$ShipNameField = null;
		this.$3$ShipAddressField = null;
		this.$3$ShipCityField = null;
		this.$3$ShipRegionField = null;
		this.$3$ShipPostalCodeField = null;
		this.$3$ShipCountryField = null;
		Serenity.PrefixedContext.call(this, idPrefix);
	};
	$Serene1_Northwind_OrderForm.__typeName = 'Serene1.Northwind.OrderForm';
	global.Serene1.Northwind.OrderForm = $Serene1_Northwind_OrderForm;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Northwind.OrderGrid
	var $Serene1_Northwind_OrderGrid = function(container) {
		this.$shippingState = null;
		this.$7$CustomerFilterField = null;
		Serenity.EntityGrid.call(this, container);
	};
	$Serene1_Northwind_OrderGrid.__typeName = 'Serene1.Northwind.OrderGrid';
	global.Serene1.Northwind.OrderGrid = $Serene1_Northwind_OrderGrid;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Northwind.OrderShippingState
	var $Serene1_Northwind_OrderShippingState = function() {
	};
	$Serene1_Northwind_OrderShippingState.__typeName = 'Serene1.Northwind.OrderShippingState';
	global.Serene1.Northwind.OrderShippingState = $Serene1_Northwind_OrderShippingState;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Northwind.PhoneEditor
	var $Serene1_Northwind_PhoneEditor = function(input) {
		this.$5$MultipleField = false;
		Serenity.StringEditor.call(this, input);
		this.addValidationRule(this.uniqueName, ss.mkdel(this, function(e) {
			var value = Q.trimToNull(this.get_value());
			if (ss.isNullOrUndefined(value)) {
				return null;
			}
			return $Serene1_Northwind_PhoneEditor.$validate(value, this.get_multiple());
		}));
		input.bind('change', ss.mkdel(this, function(e1) {
			if (!Serenity.WX.hasOriginalEvent(e1)) {
				return;
			}
			this.formatValue();
		}));
		input.bind('blur', ss.mkdel(this, function(e2) {
			if (this.element.hasClass('valid')) {
				this.formatValue();
			}
		}));
	};
	$Serene1_Northwind_PhoneEditor.__typeName = 'Serene1.Northwind.PhoneEditor';
	$Serene1_Northwind_PhoneEditor.$validate = function(phone, isMultiple) {
		var valid = (isMultiple ? $Serene1_Northwind_PhoneEditor.$isValidMulti(phone, $Serene1_Northwind_PhoneEditor.$isValidPhone) : $Serene1_Northwind_PhoneEditor.$isValidPhone(phone));
		if (valid) {
			return null;
		}
		return Q.text((isMultiple ? 'Validation.NorthwindPhoneMultiple' : 'Validation.NorthwindPhone'));
	};
	$Serene1_Northwind_PhoneEditor.$isValidPhone = function(phone) {
		if (Q.isEmptyOrNull(phone)) {
			return false;
		}
		phone = ss.replaceAllString(ss.replaceAllString(phone, ' ', ''), '-', '');
		if (phone.length < 10) {
			return false;
		}
		if (ss.startsWithString(phone, '0')) {
			phone = phone.substring(1);
		}
		if (ss.startsWithString(phone, '(') && phone.charCodeAt(4) === 41) {
			phone = phone.substr(1, 3) + phone.substring(5);
		}
		if (phone.length !== 10) {
			return false;
		}
		if (ss.startsWithString(phone, '0')) {
			return false;
		}
		for (var i = 0; i < phone.length; i++) {
			var c = phone.charCodeAt(i);
			if (c < 48 || c > 57) {
				return false;
			}
		}
		return true;
	};
	$Serene1_Northwind_PhoneEditor.$formatPhone = function(phone) {
		if (!$Serene1_Northwind_PhoneEditor.$isValidPhone(phone)) {
			return phone;
		}
		phone = ss.replaceAllString(ss.replaceAllString(ss.replaceAllString(ss.replaceAllString(phone, ' ', ''), '-', ''), '(', ''), ')', '');
		if (ss.startsWithString(phone, '0')) {
			phone = phone.substring(1);
		}
		phone = '(' + phone.substr(0, 3) + ') ' + phone.substr(3, 3) + '-' + phone.substr(6, 2) + phone.substr(8, 2);
		return phone;
	};
	$Serene1_Northwind_PhoneEditor.$formatMulti = function(phone, format) {
		var phones = ss.replaceAllString(phone, String.fromCharCode(59), String.fromCharCode(44)).split(String.fromCharCode(44));
		var result = '';
		for (var $t1 = 0; $t1 < phones.length; $t1++) {
			var x = phones[$t1];
			var s = Q.trimToNull(x);
			if (ss.isNullOrUndefined(s)) {
				continue;
			}
			if (result.length > 0) {
				result += ', ';
			}
			result += format(s);
		}
		return result;
	};
	$Serene1_Northwind_PhoneEditor.$isValidMulti = function(phone, check) {
		if (Q.isEmptyOrNull(phone)) {
			return false;
		}
		var phones = ss.replaceAllString(phone, String.fromCharCode(59), String.fromCharCode(44)).split(String.fromCharCode(44));
		var anyValid = false;
		for (var $t1 = 0; $t1 < phones.length; $t1++) {
			var x = phones[$t1];
			var s = Q.trimToNull(x);
			if (ss.isNullOrUndefined(s)) {
				continue;
			}
			if (!check(s)) {
				return false;
			}
			anyValid = true;
		}
		if (!anyValid) {
			return false;
		}
		return true;
	};
	global.Serene1.Northwind.PhoneEditor = $Serene1_Northwind_PhoneEditor;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Northwind.ProductDialog
	var $Serene1_Northwind_ProductDialog = function() {
		Serenity.EntityDialog.call(this);
	};
	$Serene1_Northwind_ProductDialog.__typeName = 'Serene1.Northwind.ProductDialog';
	global.Serene1.Northwind.ProductDialog = $Serene1_Northwind_ProductDialog;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Northwind.ProductForm
	var $Serene1_Northwind_ProductForm = function(idPrefix) {
		this.$3$ProductNameField = null;
		this.$3$ProductImageField = null;
		this.$3$DiscontinuedField = null;
		this.$3$SupplierIDField = null;
		this.$3$CategoryIDField = null;
		this.$3$QuantityPerUnitField = null;
		this.$3$UnitPriceField = null;
		this.$3$UnitsInStockField = null;
		this.$3$UnitsOnOrderField = null;
		this.$3$ReorderLevelField = null;
		Serenity.PrefixedContext.call(this, idPrefix);
	};
	$Serene1_Northwind_ProductForm.__typeName = 'Serene1.Northwind.ProductForm';
	global.Serene1.Northwind.ProductForm = $Serene1_Northwind_ProductForm;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Northwind.ProductGrid
	var $Serene1_Northwind_ProductGrid = function(container) {
		this.$pendingChanges = {};
		Serenity.EntityGrid.call(this, container);
		this.slickContainer.on('change', 'input.edit', ss.mkdel(this, this.$inputsChange));
	};
	$Serene1_Northwind_ProductGrid.__typeName = 'Serene1.Northwind.ProductGrid';
	global.Serene1.Northwind.ProductGrid = $Serene1_Northwind_ProductGrid;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Northwind.RegionDialog
	var $Serene1_Northwind_RegionDialog = function() {
		Serenity.EntityDialog.call(this);
	};
	$Serene1_Northwind_RegionDialog.__typeName = 'Serene1.Northwind.RegionDialog';
	global.Serene1.Northwind.RegionDialog = $Serene1_Northwind_RegionDialog;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Northwind.RegionForm
	var $Serene1_Northwind_RegionForm = function(idPrefix) {
		this.$3$RegionIDField = null;
		this.$3$RegionDescriptionField = null;
		Serenity.PrefixedContext.call(this, idPrefix);
	};
	$Serene1_Northwind_RegionForm.__typeName = 'Serene1.Northwind.RegionForm';
	global.Serene1.Northwind.RegionForm = $Serene1_Northwind_RegionForm;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Northwind.RegionGrid
	var $Serene1_Northwind_RegionGrid = function(container) {
		Serenity.EntityGrid.call(this, container);
	};
	$Serene1_Northwind_RegionGrid.__typeName = 'Serene1.Northwind.RegionGrid';
	global.Serene1.Northwind.RegionGrid = $Serene1_Northwind_RegionGrid;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Northwind.ShipperDialog
	var $Serene1_Northwind_ShipperDialog = function() {
		Serenity.EntityDialog.call(this);
	};
	$Serene1_Northwind_ShipperDialog.__typeName = 'Serene1.Northwind.ShipperDialog';
	global.Serene1.Northwind.ShipperDialog = $Serene1_Northwind_ShipperDialog;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Northwind.ShipperForm
	var $Serene1_Northwind_ShipperForm = function(idPrefix) {
		this.$3$CompanyNameField = null;
		this.$3$PhoneField = null;
		Serenity.PrefixedContext.call(this, idPrefix);
	};
	$Serene1_Northwind_ShipperForm.__typeName = 'Serene1.Northwind.ShipperForm';
	global.Serene1.Northwind.ShipperForm = $Serene1_Northwind_ShipperForm;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Northwind.ShipperFormatter
	var $Serene1_Northwind_ShipperFormatter = function() {
	};
	$Serene1_Northwind_ShipperFormatter.__typeName = 'Serene1.Northwind.ShipperFormatter';
	global.Serene1.Northwind.ShipperFormatter = $Serene1_Northwind_ShipperFormatter;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Northwind.ShipperGrid
	var $Serene1_Northwind_ShipperGrid = function(container) {
		Serenity.EntityGrid.call(this, container);
	};
	$Serene1_Northwind_ShipperGrid.__typeName = 'Serene1.Northwind.ShipperGrid';
	global.Serene1.Northwind.ShipperGrid = $Serene1_Northwind_ShipperGrid;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Northwind.SupplierDialog
	var $Serene1_Northwind_SupplierDialog = function() {
		Serenity.EntityDialog.call(this);
	};
	$Serene1_Northwind_SupplierDialog.__typeName = 'Serene1.Northwind.SupplierDialog';
	global.Serene1.Northwind.SupplierDialog = $Serene1_Northwind_SupplierDialog;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Northwind.SupplierForm
	var $Serene1_Northwind_SupplierForm = function(idPrefix) {
		this.$3$CompanyNameField = null;
		this.$3$ContactNameField = null;
		this.$3$ContactTitleField = null;
		this.$3$AddressField = null;
		this.$3$CityField = null;
		this.$3$RegionField = null;
		this.$3$PostalCodeField = null;
		this.$3$CountryField = null;
		this.$3$PhoneField = null;
		this.$3$FaxField = null;
		this.$3$HomePageField = null;
		Serenity.PrefixedContext.call(this, idPrefix);
	};
	$Serene1_Northwind_SupplierForm.__typeName = 'Serene1.Northwind.SupplierForm';
	global.Serene1.Northwind.SupplierForm = $Serene1_Northwind_SupplierForm;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Northwind.SupplierGrid
	var $Serene1_Northwind_SupplierGrid = function(container) {
		this.$country = null;
		Serenity.EntityGrid.call(this, container);
	};
	$Serene1_Northwind_SupplierGrid.__typeName = 'Serene1.Northwind.SupplierGrid';
	global.Serene1.Northwind.SupplierGrid = $Serene1_Northwind_SupplierGrid;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Northwind.TerritoryDialog
	var $Serene1_Northwind_TerritoryDialog = function() {
		Serenity.EntityDialog.call(this);
	};
	$Serene1_Northwind_TerritoryDialog.__typeName = 'Serene1.Northwind.TerritoryDialog';
	global.Serene1.Northwind.TerritoryDialog = $Serene1_Northwind_TerritoryDialog;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Northwind.TerritoryForm
	var $Serene1_Northwind_TerritoryForm = function(idPrefix) {
		this.$3$TerritoryIDField = null;
		this.$3$TerritoryDescriptionField = null;
		this.$3$RegionIDField = null;
		Serenity.PrefixedContext.call(this, idPrefix);
	};
	$Serene1_Northwind_TerritoryForm.__typeName = 'Serene1.Northwind.TerritoryForm';
	global.Serene1.Northwind.TerritoryForm = $Serene1_Northwind_TerritoryForm;
	////////////////////////////////////////////////////////////////////////////////
	// Serene1.Northwind.TerritoryGrid
	var $Serene1_Northwind_TerritoryGrid = function(container) {
		this.$region = null;
		Serenity.EntityGrid.call(this, container);
	};
	$Serene1_Northwind_TerritoryGrid.__typeName = 'Serene1.Northwind.TerritoryGrid';
	global.Serene1.Northwind.TerritoryGrid = $Serene1_Northwind_TerritoryGrid;
	////////////////////////////////////////////////////////////////////////////////
	// Serenity.HtmlBasicContentEditor
	var $Serenity_HtmlBasicContentEditor = function(textArea, opt) {
		Serenity.HtmlContentEditor.call(this, textArea, opt);
	};
	$Serenity_HtmlBasicContentEditor.__typeName = 'Serenity.HtmlBasicContentEditor';
	global.Serenity.HtmlBasicContentEditor = $Serenity_HtmlBasicContentEditor;
	ss.initClass($Serene1_Authorization, $asm, {});
	ss.initClass($Serene1_BasicProgressDialog, $asm, {
		get_cancelled: function() {
			return this.$6$CancelledField;
		},
		set_cancelled: function(value) {
			this.$6$CancelledField = value;
		},
		get_max: function() {
			return this.ById('ProgressBar').progressbar().progressbar('option', 'max');
		},
		set_max: function(value) {
			this.ById('ProgressBar').progressbar().progressbar('option', 'max', value);
		},
		get_value: function() {
			return ss.unbox(ss.cast(this.ById('ProgressBar').progressbar('value'), ss.Int32));
		},
		set_value: function(value) {
			this.ById('ProgressBar').progressbar().progressbar('value', value);
		},
		get_title: function() {
			return this.element.dialog().dialog('option', 'title');
		},
		set_title: function(value) {
			this.element.dialog().dialog('option', 'title', value);
		},
		get_cancelTitle: function() {
			return this.$6$CancelTitleField;
		},
		set_cancelTitle: function(value) {
			this.$6$CancelTitleField = value;
		},
		getDialogOptions: function() {
			var self = this;
			var opt = Serenity.TemplatedDialog.prototype.getDialogOptions.call(this);
			opt.title = Q.text('Site.BasicProgressDialog.PleaseWait');
			opt.width = 600;
			var $t1 = [];
			$t1.push({ text: Q.text('Dialogs.CancelButton'), click: ss.mkdel(this, function() {
				self.set_cancelled(true);
				self.element.closest('.ui-dialog').find('.ui-dialog-buttonpane .ui-button').attr('disabled', 'disabled').css('opacity', '0.5');
				var $t3 = self.element.dialog();
				var $t2 = Q.trimToNull(this.get_cancelTitle());
				if (ss.isNullOrUndefined($t2)) {
					$t2 = Q.text('Site.BasicProgressDialog.CancelTitle');
				}
				$t3.dialog('option', 'title', $t2);
			}) });
			opt.buttons = $t1;
			return opt;
		},
		initDialog: function() {
			Serenity.TemplatedDialog.prototype.initDialog.call(this);
			this.element.closest('.ui-dialog').find('.ui-dialog-titlebar-close').hide();
		},
		getTemplate: function() {
			return "<div class='s-DialogContent s-BasicProgressDialogContent'><div id='~_StatusText' class='status-text'></div><div id='~_ProgressBar' class='progress-bar'><div id='~_ProgressLabel' class='progress-label'></div></div></div>";
		}
	}, Serenity.TemplatedDialog, [Serenity.IDialog]);
	ss.initClass($Serene1_BulkServiceAction, $asm, {
		createProgressDialog: function() {
			this.progressDialog = new $Serene1_BasicProgressDialog();
			this.progressDialog.dialogOpen();
			this.progressDialog.set_max(Enumerable.from(this.keys).count());
			this.progressDialog.set_value(0);
		},
		getConfirmationFormat: function() {
			return Q.text('Site.BulkServiceAction.ConfirmationFormat');
		},
		getConfirmationMessage: function(targetCount) {
			return ss.formatString(this.getConfirmationFormat(), targetCount);
		},
		confirm: function(targetCount, action) {
			Q.confirm(this.getConfirmationMessage(targetCount), action);
		},
		getNothingToProcessMessage: function() {
			return Q.text('Site.BulkServiceAction.NothingToProcess');
		},
		nothingToProcess: function() {
			this.delayed(ss.mkdel(this, function() {
				Q.notifyError(this.getNothingToProcessMessage(), '', null);
			}));
		},
		getParallelRequests: function() {
			return 1;
		},
		getBatchSize: function() {
			return 1;
		},
		startParallelExecution: function() {
			this.createProgressDialog();
			this.pendingRequests = 0;
			this.completedRequests = 0;
			this.$errorCount = 0;
			this.errorByKey = new (ss.makeGenericType(ss.Dictionary$2, [String, Object]))();
			this.queue = ss.getEnumerator(this.keys);
			var parallelRequests = this.getParallelRequests();
			while (parallelRequests-- > 0) {
				this.executeNextBatch();
			}
		},
		serviceCallCleanup: function() {
			this.pendingRequests--;
			this.completedRequests++;
			var title = Q.text((this.progressDialog.get_cancelled() ? 'Site.BasicProgressDialog.CancelTitle' : 'Site.BasicProgressDialog.PleaseWait'));
			title += ' (';
			if (this.$successCount > 0) {
				title += ss.formatString(Q.text('Site.BulkServiceAction.SuccessCount'), this.$successCount);
			}
			if (this.$errorCount > 0) {
				if (this.$successCount > 0) {
					title += ', ';
				}
				title += ss.formatString(Q.text('Site.BulkServiceAction.ErrorCount'), this.$errorCount);
			}
			this.progressDialog.set_title(title + ')');
			this.progressDialog.set_value(this.$successCount + this.$errorCount);
			if (!this.progressDialog.get_cancelled() && this.progressDialog.get_value() < this.keys.length) {
				this.executeNextBatch();
			}
			else if (this.pendingRequests === 0) {
				this.progressDialog.dialogClose();
				this.showResults();
				if (!ss.staticEquals(this.get_done(), null)) {
					this.get_done()();
					this.set_done(null);
				}
			}
		},
		executeForBatch: function(batch) {
		},
		executeNextBatch: function() {
			var batchSize = this.getBatchSize();
			var batch = [];
			while (true) {
				if (batch.length >= batchSize) {
					break;
				}
				if (!this.queue.moveNext()) {
					break;
				}
				batch.push(this.queue.current());
			}
			if (batch.length > 0) {
				this.pendingRequests++;
				this.executeForBatch(batch);
			}
		},
		delayed: function(action) {
			window.setTimeout(action, 500);
		},
		getAllHadErrorsFormat: function() {
			return Q.text('Site.BulkServiceAction.AllHadErrorsFormat');
		},
		showAllHadErrors: function() {
			this.delayed(ss.mkdel(this, function() {
				Q.notifyError(ss.formatString(this.getAllHadErrorsFormat(), this.$errorCount), '', null);
			}));
		},
		getSomeHadErrorsFormat: function() {
			return Q.text('Site.BulkServiceAction.SomeHadErrorsFormat');
		},
		showSomeHadErrors: function() {
			this.delayed(ss.mkdel(this, function() {
				Q.notifyWarning(ss.formatString(this.getSomeHadErrorsFormat(), this.$successCount, this.$errorCount), '', null);
			}));
		},
		getAllSuccessFormat: function() {
			return Q.text('Site.BulkServiceAction.AllSuccessFormat');
		},
		showAllSuccess: function() {
			this.delayed(ss.mkdel(this, function() {
				Q.notifySuccess(ss.formatString(this.getAllSuccessFormat(), this.$successCount), '', null);
			}));
		},
		showResults: function() {
			if (this.$errorCount === 0 && this.$successCount === 0) {
				this.nothingToProcess();
				return;
			}
			if (this.$errorCount > 0 && this.$successCount === 0) {
				this.showAllHadErrors();
				return;
			}
			if (this.$errorCount > 0) {
				this.showSomeHadErrors();
				return;
			}
			this.showAllSuccess();
		},
		execute: function(keys) {
			this.keys = keys;
			if (this.keys.length === 0) {
				this.nothingToProcess();
				return;
			}
			this.confirm(this.keys.length, ss.mkdel(this, function() {
				this.startParallelExecution();
			}));
		},
		get_successCount: function() {
			return this.$successCount;
		},
		set_successCount: function(value) {
			this.$successCount = value;
		},
		get_errorCount: function() {
			return this.$errorCount;
		},
		set_errorCount: function(value) {
			this.$errorCount = value;
		},
		get_done: function() {
			return this.$2$DoneField;
		},
		set_done: function(value) {
			this.$2$DoneField = value;
		}
	});
	ss.initClass($Serene1_DialogUtils, $asm, {});
	ss.initClass($Serene1_LanguageList, $asm, {});
	ss.initClass($Serene1_ScriptInitialization, $asm, {});
	ss.initClass($Serene1_Administration_LanguageDialog, $asm, {}, Serenity.EntityDialog, [Serenity.IDialog, Serenity.IEditDialog, Serenity.IAsyncInit]);
	ss.initClass($Serene1_Administration_LanguageForm, $asm, {
		set_languageId: function(value) {
			this.$3$LanguageIdField = value;
		},
		set_languageName: function(value) {
			this.$3$LanguageNameField = value;
		}
	}, Serenity.PrefixedContext);
	ss.initClass($Serene1_Administration_LanguageGrid, $asm, {}, Serenity.EntityGrid, [Serenity.IDataGrid, Serenity.IAsyncInit]);
	ss.initClass($Serene1_Administration_PermissionCheckEditor, $asm, {
		$getItemGrantRevokeClass: function(item, grant) {
			if (!item.IsGroup) {
				return ((item.GrantRevoke === grant) ? ' checked' : '');
			}
			var desc = this.$getDescendants(item, true);
			var granted = Enumerable.from(desc).where(function(x) {
				return x.GrantRevoke === grant;
			});
			if (!granted.any()) {
				return '';
			}
			else if (Enumerable.from(desc).count() === granted.count()) {
				return 'checked';
			}
			else {
				return 'checked partial';
			}
		},
		$getItemEffectiveClass: function(item) {
			if (item.IsGroup) {
				var desc = this.$getDescendants(item, true);
				var grantCount = Enumerable.from(desc).count(ss.mkdel(this, function(x) {
					return x.GrantRevoke === true || ss.isNullOrUndefined(x.GrantRevoke) && this.$rolePermissions[x.Key];
				}));
				if (grantCount === desc.length || desc.length === 0) {
					return 'allow';
				}
				else if (grantCount === 0) {
					return 'deny';
				}
				else {
					return 'partial';
				}
			}
			else {
				var granted = item.GrantRevoke === true || ss.isNullOrUndefined(item.GrantRevoke) && this.$rolePermissions[item.Key];
				return (granted ? ' allow' : ' deny');
			}
		},
		getColumns: function() {
			var $t1 = [];
			$t1.push({ name: Q.text('Site.UserPermissionDialog.Permission'), field: 'Title', format: Serenity.SlickFormatting.treeToggle(ss.mkdel(this, function() {
				return this.view;
			}), function(x) {
				return x.Key;
			}, ss.mkdel(this, function(ctx) {
				var item = ctx.item;
				var klass = this.$getItemEffectiveClass(item);
				return "<span class='effective-permission " + klass + "'>" + Q.htmlEncode(ctx.value) + '</span>';
			})), width: 495, sortable: false });
			$t1.push({ name: Q.text('Site.UserPermissionDialog.Grant'), field: 'Grant', format: ss.mkdel(this, function(ctx1) {
				var item1 = ctx1.item;
				var klass1 = this.$getItemGrantRevokeClass(item1, true);
				return "<span class='check-box grant no-float " + klass1 + "'></span>";
			}), width: 65, sortable: false, headerCssClass: 'align-center', cssClass: 'align-center' });
			var columns = $t1;
			if (this.options.showRevoke) {
				columns.push({ name: Q.text('Site.UserPermissionDialog.Revoke'), field: 'Revoke', format: ss.mkdel(this, function(ctx2) {
					var item2 = ctx2.item;
					var klass2 = this.$getItemGrantRevokeClass(item2, false);
					return '<span class="check-box revoke no-float ' + klass2 + '"></span>';
				}), width: 65, sortable: false, headerCssClass: 'align-center', cssClass: 'align-center' });
			}
			return columns;
		},
		$setItems: function(items) {
			Serenity.SlickTreeHelper.setIndents(items, function(x) {
				return x.Key;
			}, function(x1) {
				return x1.ParentKey;
			}, false);
			this.view.setItems(items, true);
		},
		onViewSubmit: function() {
			return false;
		},
		onViewFilter: function(item) {
			if (!Serenity.DataGrid.prototype.onViewFilter.call(this, item)) {
				return false;
			}
			if (!Serenity.SlickTreeHelper.filterById(item, this.view, function(x) {
				return x.ParentKey;
			})) {
				return false;
			}
			if (!ss.isNullOrEmptyString(this.$containsText)) {
				return this.$matchContains(item) || item.IsGroup && Enumerable.from(this.$getDescendants(item, false)).any(ss.mkdel(this, this.$matchContains));
			}
			return true;
		},
		$matchContains: function(item) {
			return Select2.util.stripDiacritics(ss.coalesce(item.Title, '')).toLowerCase().indexOf(this.$containsText) >= 0;
		},
		$getDescendants: function(item, excludeGroups) {
			var result = [];
			var stack = new Array();
			stack.push(item);
			while (stack.length > 0) {
				var i = stack.pop();
				var $t1 = this.$byParentKey.get(i.Key).getEnumerator();
				try {
					while ($t1.moveNext()) {
						var child = $t1.current();
						if (!excludeGroups || !child.IsGroup) {
							result.push(child);
						}
						stack.push(child);
					}
				}
				finally {
					$t1.dispose();
				}
			}
			return result;
		},
		onClick: function(e, row, cell) {
			Serenity.DataGrid.prototype.onClick.call(this, e, row, cell);
			if (!e.isDefaultPrevented()) {
				Serenity.SlickTreeHelper.toggleClick(e, row, cell, this.view, function(x) {
					return x.Key;
				});
			}
			if (e.isDefaultPrevented()) {
				return;
			}
			var target = $(e.target);
			var grant = target.hasClass('grant');
			if (ss.unbox(grant) || target.hasClass('revoke')) {
				e.preventDefault();
				var item = this.rows.getDataItem(row);
				var checkedOrPartial = target.hasClass('checked') || target.hasClass('partial');
				if (checkedOrPartial) {
					grant = null;
				}
				else {
					grant = !!(ss.unbox(grant) ^ checkedOrPartial);
				}
				if (item.IsGroup) {
					var $t1 = this.$getDescendants(item, true);
					for (var $t2 = 0; $t2 < $t1.length; $t2++) {
						var d = $t1[$t2];
						if (!ss.referenceEquals(d.GrantRevoke, grant)) {
							d.GrantRevoke = grant;
						}
					}
				}
				else if (!ss.referenceEquals(item.GrantRevoke, grant)) {
					item.GrantRevoke = grant;
				}
				this.slickGrid.invalidate();
			}
		},
		$getParentKey: function(key) {
			if (ss.endsWithString(key, ':')) {
				key = key.substr(0, key.length - 1);
			}
			var idx = key.lastIndexOf(String.fromCharCode(58));
			if (idx >= 0) {
				return key.substr(0, idx + 1);
			}
			return null;
		},
		getButtons: function() {
			return [];
		},
		createToolbarExtensions: function() {
			Serenity.DataGrid.prototype.createToolbarExtensions.call(this);
			Serenity.GridUtils.addQuickSearchInputCustom(this.toolbar.element, ss.mkdel(this, function(field, text) {
				this.$containsText = Select2.util.stripDiacritics(ss.coalesce(Q.trimToNull(text), '')).toLowerCase();
				this.view.setItems(this.view.getItems(), true);
			}), null);
		},
		$getSortedGroupAndPermissionKeys: function(titleByKey) {
			var keys = Q.getRemoteData('Administration.PermissionKeys').Entities;
			titleByKey.$ = {};
			var titleWithGroup = {};
			for (var $t1 = 0; $t1 < keys.length; $t1++) {
				var k = keys[$t1];
				var s = k;
				if (ss.isNullOrEmptyString(s)) {
					continue;
				}
				if (ss.endsWithString(s, ':')) {
					s = s.substr(0, s.length - 1);
					if (s.length === 0) {
						continue;
					}
				}
				if (ss.keyExists(titleByKey.$, s)) {
					continue;
				}
				titleByKey.$[s] = ss.coalesce(Q.tryGetText('Permission.' + s), s);
				var parts = s.split(String.fromCharCode(58));
				var group = '';
				var groupTitle = '';
				for (var i = 0; i < parts.length - 1; i++) {
					group = group + parts[i] + ':';
					var $t3 = titleByKey.$;
					var $t2 = Q.tryGetText('Permission.' + group);
					if (ss.isNullOrUndefined($t2)) {
						$t2 = parts[i];
					}
					$t3[group] = $t2;
					groupTitle = groupTitle + titleByKey.$[group] + ':';
					titleWithGroup[group] = groupTitle;
				}
				titleWithGroup[s] = groupTitle + titleByKey.$[s];
			}
			keys = Enumerable.from(Object.keys(titleByKey.$)).toArray();
			keys.sort(function(x, y) {
				return Q.turkishLocaleCompare(titleWithGroup[x], titleWithGroup[y]);
			});
			return keys;
		},
		get_value: function() {
			var result = [];
			var $t1 = this.view.getItems();
			for (var $t2 = 0; $t2 < $t1.length; $t2++) {
				var item = $t1[$t2];
				if (ss.isValue(item.GrantRevoke) && !ss.endsWithString(item.Key, ':')) {
					result.push({ PermissionKey: item.Key, Grant: ss.unbox(item.GrantRevoke) });
				}
			}
			return result;
		},
		set_value: function(value) {
			var $t1 = this.view.getItems();
			for (var $t2 = 0; $t2 < $t1.length; $t2++) {
				var item = $t1[$t2];
				item.GrantRevoke = null;
			}
			if (ss.isValue(value)) {
				for (var $t3 = 0; $t3 < value.length; $t3++) {
					var row = value[$t3];
					var r = this.view.getItemById(row.PermissionKey);
					if (ss.isValue(r)) {
						r.GrantRevoke = ss.coalesce(row.Grant, true);
					}
				}
			}
			this.$setItems(this.getItems());
		},
		get_rolePermissions: function() {
			return Enumerable.from(Object.keys(this.$rolePermissions)).toArray();
		},
		set_rolePermissions: function(value) {
			ss.clearKeys(this.$rolePermissions);
			if (ss.isValue(value)) {
				for (var $t1 = 0; $t1 < value.length; $t1++) {
					var k = value[$t1];
					this.$rolePermissions[k] = true;
				}
			}
			this.$setItems(this.getItems());
		}
	}, Serenity.DataGrid, [Serenity.IDataGrid]);
	ss.initClass($Serene1_Administration_PermissionModuleEditor, $asm, {}, Serenity.Select2Editor, [Serenity.ISetEditValue, Serenity.IGetEditValue, Serenity.IStringValue]);
	ss.initClass($Serene1_Administration_RoleCheckEditor, $asm, {
		getButtons: function() {
			return [];
		},
		createToolbarExtensions: function() {
			Serenity.DataGrid.prototype.createToolbarExtensions.call(this);
			Serenity.GridUtils.addQuickSearchInputCustom(this.toolbar.element, ss.mkdel(this, function(field, text) {
				this.$containsText = Q.trimToNull(text);
				this.view.setItems(this.view.getItems(), true);
			}), null);
		},
		onViewFilter: function(item) {
			if (!Serenity.CheckTreeEditor.prototype.onViewFilter.call(this, item)) {
				return false;
			}
			var contains = Select2.util.stripDiacritics(ss.coalesce(this.$containsText, '')).toUpperCase();
			if (Q.isEmptyOrNull(contains)) {
				return true;
			}
			if (Select2.util.stripDiacritics(ss.coalesce(item.text, '')).toUpperCase().indexOf(contains) !== -1) {
				return true;
			}
			return false;
		},
		getItems$1: function() {
			var list = [];
			var roles = Q.getLookup('Administration.Role').get_items();
			for (var $t1 = 0; $t1 < roles.length; $t1++) {
				var role = roles[$t1];
				list.push({ id: role.RoleId.toString(), text: role.RoleName });
			}
			return list;
		}
	}, Serenity.CheckTreeEditor, [Serenity.IDataGrid, Serenity.IGetEditValue, Serenity.ISetEditValue]);
	ss.initClass($Serene1_Administration_RoleForm, $asm, {
		set_roleName: function(value) {
			this.$3$RoleNameField = value;
		}
	}, Serenity.PrefixedContext);
	ss.initClass($Serene1_Administration_RolePermissionDialog, $asm, {
		getDialogOptions: function() {
			var opt = Serenity.TemplatedDialog.prototype.getDialogOptions.call(this);
			var $t1 = [];
			$t1.push({ text: Q.text('Dialogs.OkButton'), click: ss.mkdel(this, function() {
				Q.serviceRequest('Administration/RolePermission/Update', { RoleID: this.options.roleID, Permissions: Enumerable.from(this.$permissions.get_value()).select(function(x) {
					return x.PermissionKey;
				}).toArray(), Module: null, Submodule: null }, ss.mkdel(this, function(response) {
					this.dialogClose();
					window.setTimeout(function() {
						Q.notifySuccess(Q.text('Site.RolePermissionDialog.SaveSuccess'), '', null);
					}, 0);
				}), null);
			}) });
			$t1.push({ text: Q.text('Dialogs.CancelButton'), click: ss.mkdel(this, this.dialogClose) });
			opt.buttons = $t1;
			opt.title = ss.formatString(Q.text('Site.RolePermissionDialog.DialogTitle'), this.options.title);
			return opt;
		},
		getTemplate: function() {
			return "<div id='~_Permissions'></div>";
		}
	}, Serenity.TemplatedDialog, [Serenity.IDialog]);
	ss.initClass($Serene1_Administration_TranslationGrid, $asm, {
		onClick: function(e, row, cell) {
			Serenity.DataGrid.prototype.onClick.call(this, e, row, cell);
			if (e.isDefaultPrevented()) {
				return;
			}
			if ($(e.target).hasClass('source-text')) {
				e.preventDefault();
				var item = this.rows.getDataItem(row);
				var done = ss.mkdel(this, function() {
					item.CustomText = item.SourceText;
					this.view.updateItem(item.Key, item);
					this.$hasChanges = true;
				});
				if (Q.isTrimmedEmpty(item.CustomText) || ss.referenceEquals(Q.trimToEmpty(item.CustomText), Q.trimToEmpty(item.SourceText))) {
					done();
					return;
				}
				Q.confirm(Q.text('Db.Administration.Translation.OverrideConfirmation'), done);
			}
			if ($(e.target).hasClass('target-text')) {
				e.preventDefault();
				var item1 = this.rows.getDataItem(row);
				var done1 = ss.mkdel(this, function() {
					item1.CustomText = item1.TargetText;
					this.view.updateItem(item1.Key, item1);
					this.$hasChanges = true;
				});
				if (Q.isTrimmedEmpty(item1.CustomText) || ss.referenceEquals(Q.trimToEmpty(item1.CustomText), Q.trimToEmpty(item1.TargetText))) {
					done1();
					return;
				}
				Q.confirm(Q.text('Db.Administration.Translation.OverrideConfirmation'), done1);
			}
		},
		getColumnsAsync: function() {
			var columns = [];
			columns.push({ field: 'Key', width: 300, sortable: false });
			columns.push({
				field: 'SourceText',
				width: 300,
				sortable: false,
				format: function(ctx) {
					return Q.outerHtml($('<a/>').addClass('source-text').text(ss.coalesce(ss.cast(ctx.value, String), '')));
				}
			});
			columns.push({
				field: 'CustomText',
				width: 300,
				sortable: false,
				format: function(ctx1) {
					return Q.outerHtml($('<input/>').addClass('custom-text').attr('value', ss.cast(ctx1.value, String)).attr('type', 'text').attr('data-key', ss.cast(ctx1.item.Key, String)));
				}
			});
			columns.push({
				field: 'TargetText',
				width: 300,
				sortable: false,
				format: function(ctx2) {
					return Q.outerHtml($('<a/>').addClass('target-text').text(ss.coalesce(ss.cast(ctx2.value, String), '')));
				}
			});
			return RSVP.resolve(columns);
		},
		createToolbarExtensions: function() {
			Serenity.EntityGrid.prototype.createToolbarExtensions.call(this);
			var $t2 = ss.mkdel(this, function(e) {
				e.appendTo(this.toolbar.element).attr('placeholder', '--- ' + Q.text('Db.Administration.Translation.SourceLanguage') + ' ---');
			});
			var $t1 = Serenity.LookupEditorOptions.$ctor();
			$t1.lookupKey = 'Administration.Language';
			this.$sourceLanguage = Serenity.Widget.create(Serenity.LookupEditor).call(null, $t2, $t1, null);
			Serenity.WX.changeSelect2(this.$sourceLanguage, ss.mkdel(this, function(e1) {
				if (this.$hasChanges) {
					this.saveChanges(this.$targetLanguageKey).then(ss.mkdel(this, this.refresh), null);
				}
				else {
					this.refresh();
				}
			}));
			var $t4 = ss.mkdel(this, function(e2) {
				e2.appendTo(this.toolbar.element).attr('placeholder', '--- ' + Q.text('Db.Administration.Translation.TargetLanguage') + ' ---');
			});
			var $t3 = Serenity.LookupEditorOptions.$ctor();
			$t3.lookupKey = 'Administration.Language';
			this.$targetLanguage = Serenity.Widget.create(Serenity.LookupEditor).call(null, $t4, $t3, null);
			Serenity.WX.changeSelect2(this.$targetLanguage, ss.mkdel(this, function(e3) {
				if (this.$hasChanges) {
					this.saveChanges(this.$targetLanguageKey).then(ss.mkdel(this, this.refresh), null);
				}
				else {
					this.refresh();
				}
			}));
		},
		saveChanges: function(language) {
			var translations = {};
			var $t1 = this.view.getItems();
			for (var $t2 = 0; $t2 < $t1.length; $t2++) {
				var item = $t1[$t2];
				translations[item.Key] = item.CustomText;
			}
			return RSVP.resolve(Q.serviceRequest('Administration/Translation/Update', { TargetLanguageID: language, Translations: translations }, null, null)).then(ss.mkdel(this, function() {
				this.$hasChanges = false;
				language = ss.coalesce(Q.trimToNull(language), 'invariant');
				Q.notifySuccess('User translations in "' + language + '" language are saved to "user.texts.' + language + '.json" ' + 'file under "~/App_Data/texts/"', '', null);
			}), null);
		},
		onViewSubmit: function() {
			var request = this.view.params;
			request.SourceLanguageID = this.$sourceLanguage.get_value();
			this.$targetLanguageKey = ss.coalesce(this.$targetLanguage.get_value(), '');
			request.TargetLanguageID = this.$targetLanguageKey;
			this.$hasChanges = false;
			return Serenity.DataGrid.prototype.onViewSubmit.call(this);
		},
		getButtons: function() {
			var $t1 = [];
			$t1.push({ title: Q.text('Db.Administration.Translation.SaveChangesButton'), onClick: ss.mkdel(this, function(e) {
				this.saveChanges(this.$targetLanguageKey).then(ss.mkdel(this, this.refresh), null);
			}), cssClass: 'apply-changes-button' });
			return $t1;
		},
		createQuickSearchInput: function() {
			Serenity.GridUtils.addQuickSearchInputCustom(this.toolbar.element, ss.mkdel(this, function(field, searchText) {
				this.$searchText = searchText;
				this.view.setItems(this.view.getItems(), true);
			}), null);
		},
		onViewFilter: function(item) {
			if (!Serenity.DataGrid.prototype.onViewFilter.call(this, item)) {
				return false;
			}
			if (Q.isEmptyOrNull(this.$searchText)) {
				return true;
			}
			var searching = Select2.util.stripDiacritics(this.$searchText).toLowerCase();
			if (Q.isEmptyOrNull(searching)) {
				return true;
			}
			if (Select2.util.stripDiacritics(ss.coalesce(item.Key, '')).toLowerCase().indexOf(searching) >= 0) {
				return true;
			}
			if (Select2.util.stripDiacritics(ss.coalesce(item.SourceText, '')).toLowerCase().indexOf(searching) >= 0) {
				return true;
			}
			if (Select2.util.stripDiacritics(ss.coalesce(item.TargetText, '')).toLowerCase().indexOf(searching) >= 0) {
				return true;
			}
			if (Select2.util.stripDiacritics(ss.coalesce(item.CustomText, '')).toLowerCase().indexOf(searching) >= 0) {
				return true;
			}
			return false;
		},
		usePager: function() {
			return false;
		}
	}, Serenity.EntityGrid, [Serenity.IDataGrid, Serenity.IAsyncInit]);
	ss.initClass($Serene1_Administration_UserForm, $asm, {
		set_username: function(value) {
			this.$3$UsernameField = value;
		},
		set_displayName: function(value) {
			this.$3$DisplayNameField = value;
		},
		set_email: function(value) {
			this.$3$EmailField = value;
		},
		set_password: function(value) {
			this.$3$PasswordField = value;
		},
		set_passwordConfirm: function(value) {
			this.$3$PasswordConfirmField = value;
		},
		set_source: function(value) {
			this.$3$SourceField = value;
		}
	}, Serenity.PrefixedContext);
	ss.initClass($Serene1_Administration_UserPermissionDialog, $asm, {
		getDialogOptions: function() {
			var opt = Serenity.TemplatedDialog.prototype.getDialogOptions.call(this);
			var $t1 = [];
			$t1.push({ text: Q.text('Dialogs.OkButton'), click: ss.mkdel(this, function() {
				Q.serviceRequest('Administration/UserPermission/Update', { UserID: this.options.userID, Permissions: this.$permissions.get_value(), Module: null, Submodule: null }, ss.mkdel(this, function(response) {
					this.dialogClose();
					window.setTimeout(function() {
						Q.notifySuccess(Q.text('Site.UserPermissionDialog.SaveSuccess'), '', null);
					}, 0);
				}), null);
			}) });
			$t1.push({ text: Q.text('Dialogs.CancelButton'), click: ss.mkdel(this, this.dialogClose) });
			opt.buttons = $t1;
			opt.title = ss.formatString(Q.text('Site.UserPermissionDialog.DialogTitle'), this.options.username);
			return opt;
		},
		getTemplate: function() {
			return "<div id='~_Permissions'></div>";
		}
	}, Serenity.TemplatedDialog, [Serenity.IDialog]);
	ss.initClass($Serene1_Administration_UserRoleDialog, $asm, {
		getDialogOptions: function() {
			var opt = Serenity.TemplatedDialog.prototype.getDialogOptions.call(this);
			var $t1 = [];
			$t1.push({ text: Q.text('Dialogs.OkButton'), click: ss.mkdel(this, function() {
				Q.serviceRequest('Administration/UserRole/Update', { UserID: this.options.userID, Roles: Enumerable.from(this.$permissions.get_value()).select(function(x) {
					return parseInt(x, 10);
				}).toArray() }, ss.mkdel(this, function(response) {
					this.dialogClose();
					window.setTimeout(function() {
						Q.notifySuccess(Q.text('Site.UserRoleDialog.SaveSuccess'), '', null);
					}, 0);
				}), null);
			}) });
			$t1.push({ text: Q.text('Dialogs.CancelButton'), click: ss.mkdel(this, this.dialogClose) });
			opt.buttons = $t1;
			opt.title = ss.formatString(Q.text('Site.UserRoleDialog.DialogTitle'), this.options.username);
			return opt;
		},
		getTemplate: function() {
			return "<div id='~_Roles'></div>";
		}
	}, Serenity.TemplatedDialog, [Serenity.IDialog]);
	ss.initClass($Serene1_Northwind_OrderGrid, $asm, {
		createToolbarExtensions: function() {
			Serenity.EntityGrid.prototype.createToolbarExtensions.call(this);
			this.set_customerFilter(this.addEqualityFilter($Serene1_Northwind_CustomerEditor).call(this, 'CustomerID', null, null, null, null, null));
			this.addDateRangeFilter('OrderDate', null);
			var $t1 = Serenity.EnumEditorOptions.$ctor();
			$t1.enumKey = 'Northwind.OrderShippingState';
			this.$shippingState = this.addEqualityFilter(Serenity.EnumEditor).call(this, 'ShippingState', null, $t1, null, null, null);
			var $t2 = Serenity.LookupEditorOptions.$ctor();
			$t2.lookupKey = 'Northwind.Shipper';
			this.addEqualityFilter(Serenity.LookupEditor).call(this, 'ShipVia', null, $t2, null, null, null);
			var $t3 = Serenity.LookupEditorOptions.$ctor();
			$t3.lookupKey = 'Northwind.OrderShipCountry';
			this.addEqualityFilter(Serenity.LookupEditor).call(this, 'ShipCountry', null, $t3, null, null, null);
			var $t4 = Serenity.LookupEditorOptions.$ctor();
			$t4.lookupKey = 'Northwind.OrderShipCity';
			$t4.cascadeFrom = 'ShipCountry';
			this.addEqualityFilter(Serenity.LookupEditor).call(this, 'ShipCity', null, $t4, null, null, null);
			var $t5 = Serenity.LookupEditorOptions.$ctor();
			$t5.lookupKey = 'Northwind.Employee';
			this.addEqualityFilter(Serenity.LookupEditor).call(this, 'EmployeeID', null, $t5, null, null, null);
		},
		get_shippingState: function() {
			return Q.toId(this.$shippingState.get_value());
		},
		set_shippingState: function(value) {
			this.$shippingState.set_value((ss.isNullOrUndefined(value) ? '' : ss.unbox(value).toString()));
		},
		getButtons: function() {
			var buttons = Serenity.EntityGrid.prototype.getButtons.call(this);
			buttons.push($Serene1_Common_ExcelExportHelper.createToolButton(this, 'Northwind/Order/ListExcel', ss.mkdel(this, this.onViewSubmit), 'Excel'));
			buttons.push(Serene1.Common.PdfExportHelper.createToolButton(this, ss.mkdel(this, this.onViewSubmit), null, null));
			return buttons;
		},
		get_customerFilter: function() {
			return this.$7$CustomerFilterField;
		},
		set_customerFilter: function(value) {
			this.$7$CustomerFilterField = value;
		}
	}, Serenity.EntityGrid, [Serenity.IDataGrid]);
	ss.initClass($Serene1_BasicSamples_CancellableBulkActionGrid, $asm, {
		createToolbarExtensions: function() {
			$Serene1_Northwind_OrderGrid.prototype.createToolbarExtensions.call(this);
			this.$rowSelection = new Serenity.GridRowSelectionMixin(this);
		},
		getButtons: function() {
			var $t1 = [];
			$t1.push({ title: 'Perform Bulk Action on Selected Orders', cssClass: 'send-button', onClick: ss.mkdel(this, function() {
				if (!this.onViewSubmit()) {
					return;
				}
				var action = new $Serene1_BasicSamples_OrderBulkAction();
				action.set_done(ss.delegateCombine(action.get_done(), ss.mkdel(this.$rowSelection, this.$rowSelection.resetCheckedAndRefresh)));
				action.execute(this.$rowSelection.getSelectedKeys());
			}) });
			return $t1;
		},
		getColumns: function() {
			var columns = Serenity.DataGrid.prototype.getColumns.call(this);
			ss.insert(columns, 0, Serenity.GridRowSelectionMixin.createSelectColumn(ss.mkdel(this, function() {
				return this.$rowSelection;
			})));
			return columns;
		},
		getViewOptions: function() {
			var opt = Serenity.EntityGrid.prototype.getViewOptions.call(this);
			opt.rowsPerPage = 2500;
			return opt;
		}
	}, $Serene1_Northwind_OrderGrid, [Serenity.IDataGrid]);
	ss.initClass($Serene1_BasicSamples_ChartInDialog, $asm, {
		onDialogOpen: function() {
			Serenity.TemplatedDialog.prototype.onDialogOpen.call(this);
			Q.serviceRequest('BasicSamples/BasicSamples/OrdersByShipper', {}, ss.mkdel(this, function(response) {
				this.$areaChart = new Morris.Area({ element: this.idPrefix + 'Chart', resize: true, parseTime: false, data: response.Values, xkey: 'Month', ykeys: response.ShipperKeys, labels: response.ShipperLabels, hideHover: 'auto' });
			}), null);
			this.element.closest('.ui-dialog').bind('resize', ss.mkdel(this, function() {
				this.arrange();
			}));
		},
		arrange: function() {
			Serenity.TemplatedDialog.prototype.arrange.call(this);
			if (ss.isValue(this.$areaChart)) {
				this.$areaChart.redraw();
			}
		},
		getTemplate: function() {
			// you could also put this in a ChartInDialog.Template.html file. it's here for simplicity.
			return "<div id='~_Chart'></div>";
		},
		getDialogOptions: function() {
			var opt = Serenity.TemplatedDialog.prototype.getDialogOptions.call(this);
			opt.title = 'Orders by Shipper';
			return opt;
		}
	}, Serenity.TemplatedDialog, [Serenity.IDialog]);
	ss.initClass($Serene1_Northwind_ProductDialog, $asm, {
		getLanguages: function() {
			return $Serene1_LanguageList.get_value();
		}
	}, Serenity.EntityDialog, [Serenity.IDialog, Serenity.IEditDialog]);
	ss.initClass($Serene1_BasicSamples_CloneableEntityDialog, $asm, {
		updateInterface: function() {
			// by default cloneButton is hidden in base UpdateInterface method
			Serenity.EntityDialog.prototype.updateInterface.call(this);
			// here we show it if it is edit mode (not new)
			this.cloneButton.toggle(this.isEditMode());
		},
		getCloningEntity: function() {
			var clone = Serenity.EntityDialog.prototype.getCloningEntity.call(this);
			// add (Clone) suffix if it's not already added
			var suffix = ' (Clone)';
			if (!ss.endsWithString(ss.coalesce(clone.ProductName, ''), suffix)) {
				clone.ProductName = ss.coalesce(clone.ProductName, '') + suffix;
			}
			// it's better to clear image for this sample
			// otherwise we would have to create a temporary copy of it
			// and upload
			clone.ProductImage = null;
			// let's clear fields not logical to be cloned
			clone.UnitsInStock = 0;
			clone.UnitsOnOrder = 0;
			return clone;
		}
	}, $Serene1_Northwind_ProductDialog, [Serenity.IDialog, Serenity.IEditDialog]);
	ss.initClass($Serene1_Northwind_ProductGrid, $asm, {
		createToolbarExtensions: function() {
			Serenity.EntityGrid.prototype.createToolbarExtensions.call(this);
			var $t1 = Serenity.LookupEditorOptions.$ctor();
			$t1.lookupKey = 'Northwind.Supplier';
			this.addEqualityFilter(Serenity.LookupEditor).call(this, 'SupplierID', null, $t1, null, null, null);
			var $t2 = Serenity.LookupEditorOptions.$ctor();
			$t2.lookupKey = 'Northwind.Category';
			this.addEqualityFilter(Serenity.LookupEditor).call(this, 'CategoryID', null, $t2, null, null, null);
		},
		getButtons: function() {
			var buttons = Serenity.EntityGrid.prototype.getButtons.call(this);
			buttons.push($Serene1_Common_ExcelExportHelper.createToolButton(this, 'Northwind/Product/ListExcel', ss.mkdel(this, this.onViewSubmit), 'Excel'));
			var $t3 = ss.mkdel(this, this.onViewSubmit);
			var $t1 = {};
			$t1['Discontinued'] = 'Dis.';
			var $t2 = {};
			$t2['ProductID'] = { columnWidth: 25, halign: 'right' };
			$t2['Discontinued'] = { columnWidth: 25 };
			buttons.push(Serene1.Common.PdfExportHelper.createToolButton(this, $t3, null, { title: 'Product List', columnTitles: $t1, tableOptions: { columnStyles: $t2 } }));
			buttons.push({ title: 'Save Changes', cssClass: 'apply-changes-button', onClick: ss.mkdel(this, function(e) {
				this.$saveClick();
			}) });
			return buttons;
		},
		onViewProcessData: function(response) {
			ss.clearKeys(this.$pendingChanges);
			this.$setSaveButtonState();
			return Serenity.DataGrid.prototype.onViewProcessData.call(this, response);
		},
		$inputFormatter: function(ctx) {
			var klass = 'edit';
			var item = ctx.item;
			var pending = this.$pendingChanges[ss.unbox(item.ProductID)];
			if (!!(ss.isValue(pending) && ss.isValue(pending[ctx.column.field]))) {
				klass += ' dirty';
			}
			var value = this.$getEffectiveValue(item, ctx.column.field);
			return "<input type='text' class='" + klass + "'" + " value='" + Q.formatNumber(value, '0.##') + "'" + '/>';
		},
		$getEffectiveValue: function(item, field) {
			var pending = this.$pendingChanges[ss.unbox(item.ProductID)];
			if (ss.isValue(pending)) {
				var $t1 = pending[field];
				if (ss.isNullOrUndefined($t1)) {
					$t1 = item[field];
				}
				return ss.cast($t1, Number);
			}
			return ss.cast(item[field], Number);
		},
		getColumns: function() {
			var columns = Serenity.DataGrid.prototype.getColumns.call(this);
			Enumerable.from(columns).single(function(x) {
				return x.field === 'UnitPrice';
			}).format = ss.mkdel(this, this.$inputFormatter);
			Enumerable.from(columns).single(function(x1) {
				return x1.field === 'UnitsInStock';
			}).format = ss.mkdel(this, this.$inputFormatter);
			Enumerable.from(columns).single(function(x2) {
				return x2.field === 'UnitsOnOrder';
			}).format = ss.mkdel(this, this.$inputFormatter);
			Enumerable.from(columns).single(function(x3) {
				return x3.field === 'ReorderLevel';
			}).format = ss.mkdel(this, this.$inputFormatter);
			return columns;
		},
		$inputsChange: function(e) {
			var cell = this.slickGrid.getCellFromEvent(e);
			var item = this.rows.getDataItem(cell.row);
			var field = this.getColumns()[cell.cell].field;
			var input = $(e.target);
			var text = ss.coalesce(Q.trimToNull(input.val()), '0');
			var pending = this.$pendingChanges[ss.unbox(item.ProductID)];
			var oldText = Q.formatNumber(this.$getEffectiveValue(item, field), '0.##');
			var value;
			if (field === 'UnitPrice') {
				value = Q.parseDecimal(text);
				if (ss.isNullOrUndefined(value) || isNaN(ss.unbox(value))) {
					Q.notifyError(Q.text('Validation.Decimal'), '', null);
					input.val(oldText);
					input.focus();
					return;
				}
			}
			else {
				var i = {};
				if (!ss.Int32.tryParse(text, i) || i.$ > 32767 || i.$ < 0) {
					Q.notifyError(Q.text('Validation.Integer'), '', null);
					input.val(oldText);
					input.focus();
					return;
				}
				value = i.$;
			}
			if (ss.isNullOrUndefined(pending)) {
				this.$pendingChanges[ss.unbox(item.ProductID)] = pending = {};
			}
			pending[field] = value;
			item[field] = value;
			this.view.refresh();
			input.val(Q.formatNumber(value, '0.##')).addClass('dirty');
			this.$setSaveButtonState();
		},
		$setSaveButtonState: function() {
			this.toolbar.findButton('apply-changes-button').toggleClass('disabled', ss.getKeyCount(this.$pendingChanges) === 0);
		},
		$saveClick: function() {
			if (ss.getKeyCount(this.$pendingChanges) === 0) {
				return;
			}
			// this calls save service for all modified rows, one by one
			// you could write a batch update service
			var enumerator = new ss.ObjectEnumerator(Q.deepClone(this.$pendingChanges));
			var saveNext = null;
			saveNext = ss.mkdel(this, function() {
				if (!enumerator.moveNext()) {
					this.refresh();
					return;
				}
				var pair = enumerator.current();
				var entity = Q.deepClone(pair.value);
				entity.ProductID = pair.key;
				Q.serviceRequest('Northwind/Product/Update', { EntityId: pair.key, Entity: entity }, ss.mkdel(this, function(response) {
					delete this.$pendingChanges[pair.key];
					saveNext();
				}), null);
			});
			saveNext();
		}
	}, Serenity.EntityGrid, [Serenity.IDataGrid]);
	ss.initClass($Serene1_BasicSamples_CloneableEntityGrid, $asm, {}, $Serene1_Northwind_ProductGrid, [Serenity.IDataGrid]);
	ss.initClass($Serene1_BasicSamples_DefaultValuesInNewGrid, $asm, {
		addButtonClick: function() {
			this.editItem({ CustomerID: 'ANTON', RequiredDate: Q.formatDate(new Date(), 'yyyy-MM-dd'), EmployeeID: Enumerable.from(Q.getLookup('Northwind.Employee').get_items()).first(function(x) {
				return x.FullName === 'Robert King';
			}).EmployeeID, ShipVia: Enumerable.from(Q.getLookup('Northwind.Shipper').get_items()).first(function(x1) {
				return x1.CompanyName === 'Speedy Express';
			}).ShipperID });
		},
		getButtons: function() {
			// preserving default New Item button
			var buttons = $Serene1_Northwind_OrderGrid.prototype.getButtons.call(this);
			buttons.push({ title: 'Add Order from the Queen', cssClass: 'add-button', onClick: ss.mkdel(this, function() {
				// using EditItem method as a shortcut to create a new Order dialog,
				// bind to its events, load our order row, and open dialog
				this.editItem({ CustomerID: 'QUEEN', EmployeeID: Enumerable.from(Q.getLookup('Northwind.Employee').get_items()).first(function(x) {
					return x.FullName === 'Nancy Davolio';
				}).EmployeeID, ShipVia: Enumerable.from(Q.getLookup('Northwind.Shipper').get_items()).first(function(x1) {
					return x1.CompanyName === 'United Package';
				}).ShipperID });
			}) });
			buttons.push({ title: 'Add Order with 5 Chai by Laura', cssClass: 'add-note-button', onClick: ss.mkdel(this, function() {
				// we could use EditItem here too, but for demonstration
				// purposes we are manually creating dialog this time
				var dlg = new $Serene1_Northwind_OrderDialog();
				// let grid watch for changes to manually created dialog, 
				// so when a new item is saved, grid can refresh itself
				this.initDialog(dlg);
				// get a reference to product Chai
				var chai = Enumerable.from(Q.getLookup('Northwind.Product').get_items()).first(function(x2) {
					return x2.ProductName === 'Chai';
				});
				// LoadEntityAndOpenDialog, loads an OrderRow 
				// to dialog and opens it
				var $t2 = Enumerable.from(Q.getLookup('Northwind.Employee').get_items()).first(function(x3) {
					return x3.FullName === 'Laura Callahan';
				}).EmployeeID;
				var $t1 = [];
				$t1.push({ ProductID: chai.ProductID, ProductName: chai.ProductName, UnitPrice: chai.UnitPrice, Quantity: 5, LineTotal: ss.Nullable$1.mul(chai.UnitPrice, 5) });
				dlg.loadEntityAndOpenDialog({ CustomerID: 'GOURL', EmployeeID: $t2, DetailList: $t1 });
			}) });
			return buttons;
		}
	}, $Serene1_Northwind_OrderGrid, [Serenity.IDataGrid]);
	ss.initClass($Serene1_Common_GridEditorBase, $asm, {
		id: function(entity) {
			return ss.cast(entity.__id, ss.Int32);
		},
		save: function(opt, callback) {
			var request = opt.request;
			var row = Q.deepClone(request.Entity);
			var id = ss.cast(row.__id, ss.Int32);
			if (ss.isNullOrUndefined(id)) {
				row.__id = this.$nextId++;
			}
			if (!this.validateEntity(row, id)) {
				return;
			}
			var items = ss.arrayClone(this.view.getItems());
			if (ss.isNullOrUndefined(id)) {
				items.push(row);
			}
			else {
				var index = Enumerable.from(items).indexOf(ss.mkdel(this, function(x) {
					return this.id(x) === ss.unbox(id);
				}));
				items[index] = Q.deepClone(new Object(), items[index], row);
			}
			this.setEntities(items);
			callback({});
		},
		deleteEntity: function(id) {
			this.view.deleteItem(id);
			return true;
		},
		validateEntity: function(row, id) {
			return true;
		},
		setEntities: function(items) {
			this.view.setItems(items, true);
		},
		getNewEntity: function() {
			return new Object();
		},
		getButtons: function() {
			var $t1 = [];
			$t1.push({ title: this.getAddButtonCaption(), cssClass: 'add-button', onClick: ss.mkdel(this, function() {
				this.createEntityDialog(this.getItemType(), ss.mkdel(this, function(dlg) {
					var dialog = ss.cast(dlg, $Serene1_Common_GridEditorDialog);
					dialog.set_onSave(ss.mkdel(this, this.save));
					dialog.loadEntityAndOpenDialog(this.getNewEntity());
				}));
			}) });
			return $t1;
		},
		editItem: function(entityOrId) {
			var id = ss.unbox(Q.toId(entityOrId));
			var item = this.view.getItemById(id);
			this.createEntityDialog(this.getItemType(), ss.mkdel(this, function(dlg) {
				var dialog = ss.cast(dlg, $Serene1_Common_GridEditorDialog);
				dialog.set_onDelete(ss.mkdel(this, function(opt, callback) {
					if (!this.deleteEntity(id)) {
						return;
					}
					callback({});
				}));
				dialog.set_onSave(ss.mkdel(this, this.save));
				dialog.loadEntityAndOpenDialog(item);
			}));
		},
		getEditValue: function(property, target) {
			target[property.name] = this.get_value();
		},
		setEditValue: function(source, property) {
			this.set_value(ss.cast(source[property.name], Array));
		},
		get_value: function() {
			return Enumerable.from(this.view.getItems()).select(function(x) {
				var y = Q.deepClone(x);
				delete y['__id'];
				return y;
			}).toArray();
		},
		set_value: function(value) {
			this.view.setItems(Enumerable.from(value || []).select(ss.mkdel(this, function(x) {
				var y = Q.deepClone(x);
				y.__id = this.$nextId++;
				return y;
			})).toArray(), true);
		},
		getGridCanLoad: function() {
			return false;
		},
		usePager: function() {
			return false;
		},
		getInitialTitle: function() {
			return null;
		},
		createQuickSearchInput: function() {
		}
	}, Serenity.EntityGrid, [Serenity.IDataGrid, Serenity.ISetEditValue, Serenity.IGetEditValue]);
	ss.initClass($Serene1_Northwind_OrderDetailsEditor, $asm, {
		validateEntity: function(row, id) {
			row.ProductID = Q.toId(row.ProductID);
			var sameProduct = Enumerable.from(this.view.getItems()).firstOrDefault(function(x) {
				return ss.referenceEquals(x.ProductID, row.ProductID);
			}, ss.getDefaultValue(Object));
			if (ss.isValue(sameProduct) && !ss.referenceEquals(this.id(sameProduct), id)) {
				Q.alert('This product is already in order details!');
				return false;
			}
			row.ProductName = Q.getLookup('Northwind.Product').get_itemById()[row.ProductID].ProductName;
			row.LineTotal = ss.coalesce(row.Quantity, 0) * ss.coalesce(row.UnitPrice, 0) - ss.coalesce(row.Discount, 0);
			return true;
		}
	}, $Serene1_Common_GridEditorBase, [Serenity.IDataGrid, Serenity.ISetEditValue, Serenity.IGetEditValue]);
	ss.initClass($Serene1_BasicSamples_FilteredLookupDetailEditor, $asm, {
		initEntityDialog: function(itemType, dialog) {
			Serenity.EntityGrid.prototype.initEntityDialog.call(this, itemType, dialog);
			// passing category ID from grid editor to detail dialog
			ss.cast(dialog, $Serene1_BasicSamples_FilteredLookupOrderDetailDialog).set_categoryID(this.get_categoryID());
		},
		get_categoryID: function() {
			return this.$9$CategoryIDField;
		},
		set_categoryID: function(value) {
			this.$9$CategoryIDField = value;
		}
	}, $Serene1_Northwind_OrderDetailsEditor, [Serenity.IDataGrid, Serenity.ISetEditValue, Serenity.IGetEditValue]);
	ss.initClass($Serene1_BasicSamples_FilteredLookupInDetailDialog, $asm, {}, Serenity.EntityDialog, [Serenity.IDialog, Serenity.IEditDialog]);
	ss.initClass($Serene1_BasicSamples_FilteredLookupInDetailForm, $asm, {
		set_customerID: function(value) {
			this.$3$CustomerIDField = value;
		},
		set_orderDate: function(value) {
			this.$3$OrderDateField = value;
		},
		set_categoryID: function(value) {
			this.$3$CategoryIDField = value;
		},
		set_detailList: function(value) {
			this.$3$DetailListField = value;
		}
	}, Serenity.PrefixedContext);
	ss.initClass($Serene1_BasicSamples_FilteredLookupInDetailGrid, $asm, {}, $Serene1_Northwind_OrderGrid, [Serenity.IDataGrid]);
	ss.initClass($Serene1_Common_GridEditorDialog, $asm, {
		destroy: function() {
			this.set_onSave(null);
			this.set_onDelete(null);
			Serenity.EntityDialog.prototype.destroy.call(this);
		},
		updateInterface: function() {
			Serenity.EntityDialog.prototype.updateInterface.call(this);
			// apply changes button doesn't work properly with in-memory grids yet
			if (ss.isValue(this.applyChangesButton)) {
				this.applyChangesButton.hide();
			}
		},
		saveHandler: function(options, callback) {
			if (!ss.staticEquals(this.get_onSave(), null)) {
				this.get_onSave()(options, callback);
			}
		},
		deleteHandler: function(options, callback) {
			if (!ss.staticEquals(this.get_onDelete(), null)) {
				this.get_onDelete()(options, callback);
			}
		},
		get_onSave: function() {
			return this.$8$OnSaveField;
		},
		set_onSave: function(value) {
			this.$8$OnSaveField = value;
		},
		get_onDelete: function() {
			return this.$8$OnDeleteField;
		},
		set_onDelete: function(value) {
			this.$8$OnDeleteField = value;
		}
	}, Serenity.EntityDialog, [Serenity.IDialog, Serenity.IEditDialog]);
	ss.initClass($Serene1_Northwind_OrderDetailDialog, $asm, {}, $Serene1_Common_GridEditorDialog, [Serenity.IDialog, Serenity.IEditDialog]);
	ss.initClass($Serene1_BasicSamples_FilteredLookupOrderDetailDialog, $asm, {
		beforeLoadEntity: function(entity) {
			Serenity.EntityDialog.prototype.beforeLoadEntity.call(this, entity);
			// setting cascade value here
			// make sure you have [LookupInclude] on CategoryID property of ProductRow
			// otherwise this field won't be available in lookup script (will always be null),
			// so can't be filtered and you'll end up with an empty product list.
			this.form.w('ProductID', Serenity.LookupEditor).set_cascadeValue(this.get_categoryID());
		},
		get_categoryID: function() {
			return this.$10$CategoryIDField;
		},
		set_categoryID: function(value) {
			this.$10$CategoryIDField = value;
		}
	}, $Serene1_Northwind_OrderDetailDialog, [Serenity.IDialog, Serenity.IEditDialog]);
	ss.initClass($Serene1_BasicSamples_GridFilteredByCriteria, $asm, {
		onViewSubmit: function() {
			// only continue if base class returns true (didn't cancel request)
			if (!Serenity.DataGrid.prototype.onViewSubmit.call(this)) {
				return false;
			}
			// view object is the data source for grid (SlickRemoteView)
			// this is an EntityGrid so its Params object is a ListRequest
			var request = this.view.params;
			// list request has a Criteria parameter
			// we use " &= " here because otherwise we might clear 
			// filter set by an edit filter dialog if any.
			request.Criteria = Serenity.Criteria.join(request.Criteria, 'and', Serenity.Criteria.join(Serenity.Criteria.join([['UnitsInStock'], '>', 10], 'and', [['CategoryName'], '!=', 'Condiments']), 'and', [['Discontinued'], '=', 0]));
			return true;
		}
	}, $Serene1_Northwind_ProductGrid, [Serenity.IDataGrid]);
	ss.initClass($Serene1_BasicSamples_GroupingAndSummariesInGrid, $asm, {
		createSlickGrid: function() {
			var grid = Serenity.DataGrid.prototype.createSlickGrid.call(this);
			// need to register this plugin for grouping or you'll have errors
			grid.registerPlugin(new Slick.Data.GroupItemMetadataProvider());
			var $t2 = this.view;
			var $t1 = [];
			$t1.push(new Slick.Aggregators.Avg('UnitPrice'));
			$t1.push(new Slick.Aggregators.Sum('UnitsInStock'));
			$t1.push(new Slick.Aggregators.Max('UnitsOnOrder'));
			$t1.push(new Slick.Aggregators.Avg('ReorderLevel'));
			$t2.setSummaryOptions({ aggregators: $t1 });
			return grid;
		},
		getColumns: function() {
			var columns = $Serene1_Northwind_ProductGrid.prototype.getColumns.call(this);
			Enumerable.from(columns).single(function(x) {
				return x.field === 'UnitsOnOrder';
			}).groupTotalsFormatter = function(totals, col) {
				return (ss.isValue(totals.max) ? ('max: ' + ss.coalesce(totals.max[col.field], '')) : '');
			};
			Enumerable.from(columns).single(function(x1) {
				return x1.field === 'ReorderLevel';
			}).groupTotalsFormatter = function(totals1, col1) {
				return (ss.isValue(totals1.avg) ? ('avg: ' + ss.coalesce(Q.formatNumber(totals1.avg[col1.field], '0.'), '')) : '');
			};
			return columns;
		},
		getSlickOptions: function() {
			var opt = Serenity.DataGrid.prototype.getSlickOptions.call(this);
			opt.showFooterRow = true;
			return opt;
		},
		usePager: function() {
			return false;
		},
		getButtons: function() {
			var $t1 = [];
			$t1.push({ title: 'Group By Category', cssClass: 'expand-all-button', onClick: ss.mkdel(this, function() {
				var $t3 = this.view;
				var $t2 = [];
				$t2.push({ getter: 'CategoryName' });
				$t3.setGrouping($t2);
			}) });
			$t1.push({ title: 'Group By Category and Supplier', cssClass: 'expand-all-button', onClick: ss.mkdel(this, function() {
				var $t5 = this.view;
				var $t4 = [];
				$t4.push({
					formatter: function(x) {
						return 'Category: ' + x.value + ' (' + x.count + ' items)';
					},
					getter: 'CategoryName'
				});
				$t4.push({
					formatter: function(x1) {
						return 'Supplier: ' + x1.value + ' (' + x1.count + ' items)';
					},
					getter: 'SupplierCompanyName'
				});
				$t5.setGrouping($t4);
			}) });
			$t1.push({ title: 'No Grouping', cssClass: 'collapse-all-button', onClick: ss.mkdel(this, function() {
				this.view.setGrouping([]);
			}) });
			return $t1;
		}
	}, $Serene1_Northwind_ProductGrid, [Serenity.IDataGrid]);
	ss.initClass($Serene1_BasicSamples_LookupFilterByMultipleDialog, $asm, {}, $Serene1_Northwind_ProductDialog, [Serenity.IDialog, Serenity.IEditDialog]);
	ss.initClass($Serene1_BasicSamples_LookupFilterByMultipleForm, $asm, {
		set_productName: function(value) {
			this.$3$ProductNameField = value;
		},
		set_productImage: function(value) {
			this.$3$ProductImageField = value;
		},
		set_discontinued: function(value) {
			this.$3$DiscontinuedField = value;
		},
		set_supplierID: function(value) {
			this.$3$SupplierIDField = value;
		},
		set_categoryID: function(value) {
			this.$3$CategoryIDField = value;
		},
		set_quantityPerUnit: function(value) {
			this.$3$QuantityPerUnitField = value;
		},
		set_unitPrice: function(value) {
			this.$3$UnitPriceField = value;
		},
		set_unitsInStock: function(value) {
			this.$3$UnitsInStockField = value;
		},
		set_unitsOnOrder: function(value) {
			this.$3$UnitsOnOrderField = value;
		},
		set_reorderLevel: function(value) {
			this.$3$ReorderLevelField = value;
		}
	}, Serenity.PrefixedContext);
	ss.initClass($Serene1_BasicSamples_LookupFilterByMultipleGrid, $asm, {
		onViewSubmit: function() {
			if (!Serenity.DataGrid.prototype.onViewSubmit.call(this)) {
				return false;
			}
			// this has no relation to our lookup editor but as we'll allow picking only 
			// categories of Produce and Seafood in product dialog, it's better to show
			// only products from these categories in grid too
			this.view.params.Criteria = Serenity.Criteria.join(this.view.params.Criteria, 'and', [['CategoryName'], 'in', [['Produce', 'Seafood']]]);
			return true;
		}
	}, $Serene1_Northwind_ProductGrid, [Serenity.IDataGrid]);
	ss.initClass($Serene1_Northwind_OrderDialog, $asm, {
		loadEntity: function(entity) {
			Serenity.EntityDialog.prototype.loadEntity.call(this, entity);
		},
		getToolbarButtons: function() {
			var buttons = Serenity.EntityDialog.prototype.getToolbarButtons.call(this);
			buttons.push($Serene1_Common_ReportHelper.createRenderButton('Northwind.OrderDetail', 'Invoice', 'export-pdf-button', 'pdf', ss.mkdel(this, function() {
				return { OrderID: this.get_entityId() };
			})));
			return buttons;
		}
	}, Serenity.EntityDialog, [Serenity.IDialog, Serenity.IEditDialog]);
	ss.initClass($Serene1_BasicSamples_MultiColumnDialog, $asm, {}, $Serene1_Northwind_OrderDialog, [Serenity.IDialog, Serenity.IEditDialog]);
	ss.initClass($Serene1_BasicSamples_MultiColumnGrid, $asm, {}, $Serene1_Northwind_OrderGrid, [Serenity.IDataGrid]);
	ss.initClass($Serene1_BasicSamples_MultiColumnResponsiveDialog, $asm, {}, $Serene1_Northwind_OrderDialog, [Serenity.IDialog, Serenity.IEditDialog]);
	ss.initClass($Serene1_BasicSamples_MultiColumnResponsiveGrid, $asm, {}, $Serene1_Northwind_OrderGrid, [Serenity.IDataGrid]);
	ss.initClass($Serene1_BasicSamples_OrderBulkAction, $asm, {
		getParallelRequests: function() {
			return 10;
		},
		getBatchSize: function() {
			return 5;
		},
		executeForBatch: function(batch) {
			Q.serviceRequest('BasicSamples/BasicSamples/OrderBulkAction', { OrderIDs: Enumerable.from(batch).select(function(x) {
				return parseInt(x, 10);
			}).toArray() }, ss.mkdel(this, function(response) {
				this.set_successCount(this.get_successCount() + batch.length);
			}), { blockUI: false, onError: ss.mkdel(this, function(response1) {
				this.set_errorCount(this.get_errorCount() + batch.length);
			}), onCleanup: ss.mkdel(this, this.serviceCallCleanup) });
		}
	}, $Serene1_BulkServiceAction);
	ss.initClass($Serene1_BasicSamples_ProduceSeafoodCategoryEditor, $asm, {
		getLookupKey: function() {
			return 'Northwind.Category';
		},
		getItems: function(lookup) {
			return Enumerable.from(Serenity.LookupEditorBase.prototype.getItems.call(this, lookup)).where(function(x) {
				return x.CategoryName === 'Produce' || x.CategoryName === 'Seafood';
			});
		}
	}, Serenity.LookupEditorBase, [Serenity.ISetEditValue, Serenity.IGetEditValue, Serenity.IStringValue]);
	ss.initClass($Serene1_BasicSamples_ResponsiveDialog, $asm, {}, Serenity.EntityDialog, [Serenity.IDialog, Serenity.IEditDialog]);
	ss.initClass($Serene1_BasicSamples_ResponsiveGrid, $asm, {}, $Serene1_Northwind_OrderGrid, [Serenity.IDataGrid]);
	ss.initClass($Serene1_BasicSamples_ViewWithoutIDGrid, $asm, {
		onViewProcessData: function(response) {
			response = Serenity.DataGrid.prototype.onViewProcessData.call(this, response);
			// there is no __id property in SalesByCategoryRow but this is javascript and we can set any property of an object
			for (var $t1 = 0; $t1 < response.Entities.length; $t1++) {
				var x = response.Entities[$t1];
				x.__id = this.$nextId++;
			}
			return response;
		},
		getButtons: function() {
			return [];
		}
	}, Serenity.EntityGrid, [Serenity.IDataGrid]);
	ss.initClass($Serene1_Common_ExcelExportHelper, $asm, {});
	ss.initClass($Serene1_Common_LanguageSelection, $asm, {}, Serenity.Widget);
	ss.initClass($Serene1_Common_ReportHelper, $asm, {});
	ss.initClass($Serene1_Common_SidebarSearch, $asm, {
		$updateMatchFlags: function(text) {
			var liList = this.$menuUL.find('li').removeClass('non-match');
			text = Q.trimToNull(text);
			if (ss.isNullOrUndefined(text)) {
				liList.show();
				liList.removeClass('expanded');
				return;
			}
			var parts = ss.netSplit(text, [44, 32].map(function(i) {
				return String.fromCharCode(i);
			}), null, 1);
			for (var i = 0; i < parts.length; i++) {
				parts[i] = Q.trimToNull(Select2.util.stripDiacritics(parts[i]).toUpperCase());
			}
			var items = liList;
			items.each(function(i1, e) {
				var x = $(e);
				var title = Select2.util.stripDiacritics(ss.coalesce(x.text(), '').toUpperCase());
				for (var $t1 = 0; $t1 < parts.length; $t1++) {
					var p = parts[$t1];
					if (ss.isValue(p) && !(title.indexOf(p) !== -1)) {
						x.addClass('non-match');
						break;
					}
				}
			});
			var matchingItems = items.not('.non-match');
			var visibles = matchingItems.parents('li').add(matchingItems);
			var nonVisibles = liList.not(visibles);
			nonVisibles.hide().addClass('non-match');
			visibles.show();
			liList.addClass('expanded');
		}
	}, Serenity.Widget);
	ss.initClass($Serene1_Common_ThemeSelection, $asm, {
		$getCurrentTheme: function() {
			var skinClass = Enumerable.from(ss.coalesce($('body').attr('class'), '').split(String.fromCharCode(32))).firstOrDefault(function(x) {
				return ss.startsWithString(x, 'skin-');
			}, ss.getDefaultValue(String));
			if (ss.isValue(skinClass)) {
				return skinClass.substr(5);
			}
			return 'blue';
		}
	}, Serenity.Widget);
	ss.initClass($Serene1_Membership_ChangePasswordForm, $asm, {
		set_oldPassword: function(value) {
			this.$3$OldPasswordField = value;
		},
		set_newPassword: function(value) {
			this.$3$NewPasswordField = value;
		},
		set_confirmPassword: function(value) {
			this.$3$ConfirmPasswordField = value;
		}
	}, Serenity.PrefixedContext);
	ss.initClass($Serene1_Membership_ChangePasswordPanel, $asm, {}, Serenity.PropertyPanel);
	ss.initClass($Serene1_Membership_ForgotPasswordForm, $asm, {
		set_email: function(value) {
			this.$3$EmailField = value;
		}
	}, Serenity.PrefixedContext);
	ss.initClass($Serene1_Membership_ForgotPasswordPanel, $asm, {}, Serenity.PropertyPanel);
	ss.initClass($Serene1_Membership_LoginForm, $asm, {
		set_username: function(value) {
			this.$3$UsernameField = value;
		},
		set_password: function(value) {
			this.$3$PasswordField = value;
		}
	}, Serenity.PrefixedContext);
	ss.initClass($Serene1_Membership_LoginPanel, $asm, {}, Serenity.PropertyPanel);
	ss.initClass($Serene1_Membership_ResetPasswordForm, $asm, {
		set_newPassword: function(value) {
			this.$3$NewPasswordField = value;
		},
		set_confirmPassword: function(value) {
			this.$3$ConfirmPasswordField = value;
		}
	}, Serenity.PrefixedContext);
	ss.initClass($Serene1_Membership_ResetPasswordPanel, $asm, {}, Serenity.PropertyPanel);
	ss.initClass($Serene1_Membership_SignUpForm, $asm, {
		set_displayName: function(value) {
			this.$3$DisplayNameField = value;
		},
		set_email: function(value) {
			this.$3$EmailField = value;
		},
		set_confirmEmail: function(value) {
			this.$3$ConfirmEmailField = value;
		},
		set_password: function(value) {
			this.$3$PasswordField = value;
		},
		set_confirmPassword: function(value) {
			this.$3$ConfirmPasswordField = value;
		}
	}, Serenity.PrefixedContext);
	ss.initClass($Serene1_Membership_SignUpPanel, $asm, {}, Serenity.PropertyPanel);
	ss.initClass($Serene1_Northwind_CategoryDialog, $asm, {
		getLanguages: function() {
			return $Serene1_LanguageList.get_value();
		}
	}, Serenity.EntityDialog, [Serenity.IDialog, Serenity.IEditDialog]);
	ss.initClass($Serene1_Northwind_CategoryForm, $asm, {
		set_categoryName: function(value) {
			this.$3$CategoryNameField = value;
		},
		set_description: function(value) {
			this.$3$DescriptionField = value;
		}
	}, Serenity.PrefixedContext);
	ss.initClass($Serene1_Northwind_CategoryGrid, $asm, {}, Serenity.EntityGrid, [Serenity.IDataGrid, Serenity.IAsyncInit]);
	ss.initClass($Serene1_Northwind_CustomerCustomerDemoDialog, $asm, {}, Serenity.EntityDialog, [Serenity.IDialog, Serenity.IEditDialog, Serenity.IAsyncInit]);
	ss.initClass($Serene1_Northwind_CustomerCustomerDemoForm, $asm, {
		set_customerID: function(value) {
			this.$3$CustomerIDField = value;
		},
		set_customerTypeID: function(value) {
			this.$3$CustomerTypeIDField = value;
		}
	}, Serenity.PrefixedContext);
	ss.initClass($Serene1_Northwind_CustomerCustomerDemoGrid, $asm, {
		getColumns: function() {
			var columns = Serenity.DataGrid.prototype.getColumns.call(this);
			columns.push({ field: 'ID', width: 55, cssClass: 'align-right', name: Q.text('Db.Shared.RecordId') });
			columns.push({ field: 'CustomerID', width: 200, format: this.itemLink(null, null, null, null, true) });
			columns.push({ field: 'CustomerTypeID', width: 80 });
			return columns;
		}
	}, Serenity.EntityGrid, [Serenity.IDataGrid]);
	ss.initClass($Serene1_Northwind_CustomerDemographicDialog, $asm, {}, Serenity.EntityDialog, [Serenity.IDialog, Serenity.IEditDialog, Serenity.IAsyncInit]);
	ss.initClass($Serene1_Northwind_CustomerDemographicForm, $asm, {
		set_customerTypeID: function(value) {
			this.$3$CustomerTypeIDField = value;
		},
		set_customerDesc: function(value) {
			this.$3$CustomerDescField = value;
		}
	}, Serenity.PrefixedContext);
	ss.initClass($Serene1_Northwind_CustomerDemographicGrid, $asm, {
		getColumns: function() {
			var columns = Serenity.DataGrid.prototype.getColumns.call(this);
			columns.push({ field: 'ID', width: 55, cssClass: 'align-right', name: Q.text('Db.Shared.RecordId') });
			columns.push({ field: 'CustomerTypeID', width: 200, format: this.itemLink(null, null, null, null, true) });
			columns.push({ field: 'CustomerDesc', width: 80 });
			return columns;
		}
	}, Serenity.EntityGrid, [Serenity.IDataGrid]);
	ss.initClass($Serene1_Northwind_CustomerDialog, $asm, {
		$getSaveState: function() {
			try {
				return $.toJSON(this.getSaveEntity());
			}
			catch ($t1) {
				return null;
			}
		},
		loadResponse: function(data) {
			Serenity.EntityDialog.prototype.loadResponse.call(this, data);
			this.$loadedState = this.$getSaveState();
		},
		loadEntity: function(entity) {
			Serenity.EntityDialog.prototype.loadEntity.call(this, entity);
			Serenity.TabsExtensions.setDisabled(this.tabs, 'Orders', this.isNewOrDeleted());
			this.$ordersGrid.set_customerID(entity.CustomerID);
		},
		onSaveSuccess: function(response) {
			Serenity.EntityDialog.prototype.onSaveSuccess.call(this, response);
			Q.reloadLookup('Northwind.Customer');
		}
	}, Serenity.EntityDialog, [Serenity.IDialog, Serenity.IEditDialog]);
	ss.initClass($Serene1_Northwind_CustomerEditor, $asm, {
		getLookupKey: function() {
			return 'Northwind.Customer';
		},
		getItemText: function(item, lookup) {
			return Serenity.LookupEditorBase.prototype.getItemText.call(this, item, lookup) + ' [' + item.CustomerID + ']';
		}
	}, Serenity.LookupEditorBase, [Serenity.ISetEditValue, Serenity.IGetEditValue, Serenity.IStringValue]);
	ss.initClass($Serene1_Northwind_CustomerForm, $asm, {
		set_customerID: function(value) {
			this.$3$CustomerIDField = value;
		},
		set_companyName: function(value) {
			this.$3$CompanyNameField = value;
		},
		set_contactName: function(value) {
			this.$3$ContactNameField = value;
		},
		set_contactTitle: function(value) {
			this.$3$ContactTitleField = value;
		},
		set_representatives: function(value) {
			this.$3$RepresentativesField = value;
		},
		set_address: function(value) {
			this.$3$AddressField = value;
		},
		set_city: function(value) {
			this.$3$CityField = value;
		},
		set_region: function(value) {
			this.$3$RegionField = value;
		},
		set_postalCode: function(value) {
			this.$3$PostalCodeField = value;
		},
		set_country: function(value) {
			this.$3$CountryField = value;
		},
		set_phone: function(value) {
			this.$3$PhoneField = value;
		},
		set_fax: function(value) {
			this.$3$FaxField = value;
		},
		set_noteList: function(value) {
			this.$3$NoteListField = value;
		}
	}, Serenity.PrefixedContext);
	ss.initClass($Serene1_Northwind_CustomerGrid, $asm, {
		createToolbarExtensions: function() {
			Serenity.EntityGrid.prototype.createToolbarExtensions.call(this);
			var $t1 = Serenity.LookupEditorOptions.$ctor();
			$t1.lookupKey = 'Northwind.CustomerCountry';
			this.addEqualityFilter(Serenity.LookupEditor).call(this, 'Country', null, $t1, null, null, null);
			var $t2 = Serenity.LookupEditorOptions.$ctor();
			$t2.lookupKey = 'Northwind.CustomerCity';
			$t2.cascadeFrom = 'Country';
			this.addEqualityFilter(Serenity.LookupEditor).call(this, 'City', null, $t2, null, null, null);
		},
		getButtons: function() {
			var buttons = Serenity.EntityGrid.prototype.getButtons.call(this);
			buttons.push($Serene1_Common_ExcelExportHelper.createToolButton(this, 'Northwind/Customer/ListExcel', ss.mkdel(this, this.onViewSubmit), 'Excel'));
			buttons.push(Serene1.Common.PdfExportHelper.createToolButton(this, ss.mkdel(this, this.onViewSubmit), null, null));
			return buttons;
		}
	}, Serenity.EntityGrid, [Serenity.IDataGrid, Serenity.IAsyncInit]);
	ss.initClass($Serene1_Northwind_CustomerOrderDialog, $asm, {
		updateInterface: function() {
			Serenity.EntityDialog.prototype.updateInterface.call(this);
			Serenity.EditorUtils.setReadOnly(this.form.w('CustomerID', Serene1.Northwind.CustomerEditor), true);
		}
	}, $Serene1_Northwind_OrderDialog, [Serenity.IDialog, Serenity.IEditDialog]);
	ss.initClass($Serene1_Northwind_CustomerOrdersGrid, $asm, {
		getColumns: function() {
			return Enumerable.from(Serenity.DataGrid.prototype.getColumns.call(this)).where(function(x) {
				return x.field !== 'CustomerCompanyName';
			}).toArray();
		},
		initEntityDialog: function(itemType, dialog) {
			Serenity.EntityGrid.prototype.initEntityDialog.call(this, itemType, dialog);
			Serenity.SubDialogHelper.cascade(ss.cast(dialog, $Serene1_Northwind_OrderDialog), this.element.closest('.ui-dialog'));
		},
		addButtonClick: function() {
			this.editItem({ CustomerID: this.get_customerID() });
		},
		getInitialTitle: function() {
			return null;
		},
		createToolbarExtensions: function() {
			$Serene1_Northwind_OrderGrid.prototype.createToolbarExtensions.call(this);
			this.get_customerFilter().element.closest('.quick-filter-item').remove();
		},
		getGridCanLoad: function() {
			return Serenity.DataGrid.prototype.getGridCanLoad.call(this) && !ss.isNullOrEmptyString(this.$customerID);
		},
		get_customerID: function() {
			return this.$customerID;
		},
		set_customerID: function(value) {
			if (!ss.referenceEquals(this.$customerID, value)) {
				this.$customerID = value;
				this.setEquality('CustomerID', this.get_customerID());
				this.refresh();
			}
		}
	}, $Serene1_Northwind_OrderGrid, [Serenity.IDataGrid]);
	ss.initClass($Serene1_Northwind_EmployeeDialog, $asm, {}, Serenity.EntityDialog, [Serenity.IDialog, Serenity.IEditDialog, Serenity.IAsyncInit]);
	ss.initClass($Serene1_Northwind_EmployeeForm, $asm, {
		set_lastName: function(value) {
			this.$3$LastNameField = value;
		},
		set_firstName: function(value) {
			this.$3$FirstNameField = value;
		},
		set_title: function(value) {
			this.$3$TitleField = value;
		},
		set_titleOfCourtesy: function(value) {
			this.$3$TitleOfCourtesyField = value;
		},
		set_birthDate: function(value) {
			this.$3$BirthDateField = value;
		},
		set_hireDate: function(value) {
			this.$3$HireDateField = value;
		},
		set_address: function(value) {
			this.$3$AddressField = value;
		},
		set_city: function(value) {
			this.$3$CityField = value;
		},
		set_region: function(value) {
			this.$3$RegionField = value;
		},
		set_postalCode: function(value) {
			this.$3$PostalCodeField = value;
		},
		set_country: function(value) {
			this.$3$CountryField = value;
		},
		set_homePhone: function(value) {
			this.$3$HomePhoneField = value;
		},
		set_extension: function(value) {
			this.$3$ExtensionField = value;
		},
		set_photo: function(value) {
			this.$3$PhotoField = value;
		},
		set_notes: function(value) {
			this.$3$NotesField = value;
		},
		set_reportsTo: function(value) {
			this.$3$ReportsToField = value;
		},
		set_photoPath: function(value) {
			this.$3$PhotoPathField = value;
		}
	}, Serenity.PrefixedContext);
	ss.initClass($Serene1_Northwind_EmployeeFormatter, $asm, {
		format: function(ctx) {
			var text = Q.htmlEncode(ctx.value);
			if (ss.isNullOrEmptyString(this.get_genderProperty())) {
				return text;
			}
			var gender = ss.safeCast(ctx.item[this.get_genderProperty()], ss.Int32);
			return "<span class='" + ((gender === 2) ? 'employee-symbol female' : 'employee-symbol male') + "'>" + text + '</span>';
		},
		get_genderProperty: function() {
			return this.$1$GenderPropertyField;
		},
		set_genderProperty: function(value) {
			this.$1$GenderPropertyField = value;
		},
		initializeColumn: function(column) {
			column.referencedFields = column.referencedFields || [];
			if (!ss.isNullOrEmptyString(this.get_genderProperty())) {
				column.referencedFields.push(this.get_genderProperty());
				return;
			}
		}
	}, null, [Serenity.ISlickFormatter, Serenity.IInitializeColumn]);
	ss.initClass($Serene1_Northwind_EmployeeGrid, $asm, {
		getColumns: function() {
			var columns = Serenity.DataGrid.prototype.getColumns.call(this);
			columns.push({ field: 'EmployeeID', width: 55, cssClass: 'align-right', name: Q.text('Db.Shared.RecordId') });
			columns.push({ field: 'LastName', width: 200, format: this.itemLink(null, null, null, null, true) });
			columns.push({ field: 'FirstName', width: 80 });
			columns.push({ field: 'Title', width: 80 });
			columns.push({ field: 'TitleOfCourtesy', width: 80 });
			columns.push({ field: 'BirthDate', width: 80 });
			columns.push({ field: 'HireDate', width: 80 });
			columns.push({ field: 'Address', width: 80 });
			columns.push({ field: 'City', width: 80 });
			columns.push({ field: 'Region', width: 80 });
			columns.push({ field: 'PostalCode', width: 80 });
			columns.push({ field: 'Country', width: 80 });
			columns.push({ field: 'HomePhone', width: 80 });
			columns.push({ field: 'Extension', width: 80 });
			columns.push({ field: 'Photo', width: 80 });
			columns.push({ field: 'Notes', width: 80 });
			columns.push({ field: 'ReportsTo', width: 80 });
			columns.push({ field: 'PhotoPath', width: 80 });
			return columns;
		}
	}, Serenity.EntityGrid, [Serenity.IDataGrid]);
	ss.initClass($Serene1_Northwind_EmployeeTerritoryDialog, $asm, {}, Serenity.EntityDialog, [Serenity.IDialog, Serenity.IEditDialog, Serenity.IAsyncInit]);
	ss.initClass($Serene1_Northwind_EmployeeTerritoryForm, $asm, {
		set_territoryID: function(value) {
			this.$3$TerritoryIDField = value;
		}
	}, Serenity.PrefixedContext);
	ss.initClass($Serene1_Northwind_EmployeeTerritoryGrid, $asm, {
		getColumns: function() {
			var columns = Serenity.DataGrid.prototype.getColumns.call(this);
			columns.push({ field: 'EmployeeID', width: 55, cssClass: 'align-right', name: Q.text('Db.Shared.RecordId') });
			columns.push({ field: 'TerritoryID', width: 200, format: this.itemLink(null, null, null, null, true) });
			return columns;
		}
	}, Serenity.EntityGrid, [Serenity.IDataGrid]);
	ss.initClass($Serene1_Northwind_FreightFormatter, $asm, {
		format: function(ctx) {
			return "<span class='freight-symbol'>" + Q.htmlEncode(ctx.value) + '</span>';
		}
	}, null, [Serenity.ISlickFormatter]);
	ss.initEnum($Serene1_Northwind_Gender, $asm, { Male: 1, Female: 2 });
	ss.initClass($Serene1_Northwind_NoteDialog, $asm, {
		getTemplate: function() {
			return "<form id='~_Form' class='s-Form'><textarea id='~_Text' class='required'></textarea></form>";
		},
		getDialogOptions: function() {
			var opt = Serenity.TemplatedDialog.prototype.getDialogOptions.call(this);
			var $t1 = [];
			$t1.push({ text: Q.text('Dialogs.OkButton'), click: ss.mkdel(this, function() {
				if (!this.validateForm()) {
					return;
				}
				if (!ss.staticEquals(this.okClick, null)) {
					this.okClick();
				}
			}) });
			$t1.push({ text: Q.text('Dialogs.CancelButton'), click: ss.mkdel(this, this.dialogClose) });
			opt.buttons = $t1;
			return opt;
		},
		get_text: function() {
			return this.ById('Text').val();
		},
		set_text: function(value) {
			this.ById('Text').val(value);
		}
	}, Serenity.TemplatedDialog, [Serenity.IDialog]);
	ss.initClass($Serene1_Northwind_NotesEditor, $asm, {
		getTemplate: function() {
			return "<div><div id='~_Toolbar'></div><ul id='~_NoteList'></ul></div>";
		},
		$updateContent: function() {
			var noteList = this.ById('NoteList');
			noteList.children().remove();
			if (ss.isValue(this.$items)) {
				var index = 0;
				for (var $t1 = 0; $t1 < this.$items.length; $t1++) {
					var item = this.$items[$t1];
					var li = $('<li/>');
					$('<div/>').addClass('note-text').html(ss.coalesce(item.Text, '')).appendTo(li);
					$('<a/>').attr('href', '#').addClass('note-date').text(item.InsertUserDisplayName + ' - ' + Q.formatDate(Q.parseISODateTime(item.InsertDate), 'dd/MM/yyyy HH:mm')).data('index', index).appendTo(li).click(ss.mkdel(this, this.$editClick));
					$('<a/>').attr('href', '#').addClass('note-delete').attr('title', 'delete note').data('index', index).appendTo(li).click(ss.mkdel(this, this.$deleteClick));
					li.appendTo(noteList);
					index++;
				}
			}
		},
		$addClick: function() {
			var dlg = new $Serene1_Northwind_NoteDialog();
			dlg.set_dialogTitle('Add Note');
			dlg.okClick = ss.mkdel(this, function() {
				var text = Q.trimToNull(dlg.get_text());
				if (ss.isNullOrUndefined(text)) {
					return;
				}
				this.$items = this.$items || [];
				ss.insert(this.$items, 0, { Text: text, InsertUserDisplayName: $Serene1_Authorization.get_userDefinition().DisplayName, InsertDate: Q.formatISODateTimeUTC(new Date()) });
				this.$updateContent();
				dlg.dialogClose();
				this.set_isDirty(true);
				if (!ss.staticEquals(this.get_onChange(), null)) {
					this.get_onChange()();
				}
			});
			dlg.dialogOpen();
		},
		$editClick: function(e) {
			e.preventDefault();
			var index = $(e.target).data('index');
			var old = this.$items[index];
			var dlg = new $Serene1_Northwind_NoteDialog();
			dlg.set_dialogTitle('Edit Note');
			dlg.set_text(old.Text);
			dlg.okClick = ss.mkdel(this, function() {
				var text = Q.trimToNull(dlg.get_text());
				if (ss.isNullOrUndefined(text)) {
					return;
				}
				this.$items[index].Text = text;
				this.$updateContent();
				dlg.dialogClose();
				this.set_isDirty(true);
				if (!ss.staticEquals(this.get_onChange(), null)) {
					this.get_onChange()();
				}
			});
			dlg.dialogOpen();
		},
		$deleteClick: function(e) {
			e.preventDefault();
			var index = $(e.target).data('index');
			Q.confirm('Delete this note?', ss.mkdel(this, function() {
				ss.removeAt(this.$items, index);
				this.$updateContent();
				this.set_isDirty(true);
				if (!ss.staticEquals(this.get_onChange(), null)) {
					this.get_onChange()();
				}
			}));
		},
		get_value: function() {
			return this.$items;
		},
		set_value: function(value) {
			this.$items = value || [];
			this.set_isDirty(false);
			this.$updateContent();
		},
		getEditValue: function(property, target) {
			target[property.name] = this.get_value();
		},
		setEditValue: function(source, property) {
			this.set_value(ss.cast(source[property.name], Array));
		},
		get_isDirty: function() {
			return this.$6$IsDirtyField;
		},
		set_isDirty: function(value) {
			this.$6$IsDirtyField = value;
		},
		get_onChange: function() {
			return this.$6$OnChangeField;
		},
		set_onChange: function(value) {
			this.$6$OnChangeField = value;
		}
	}, Serenity.TemplatedWidget, [Serenity.IGetEditValue, Serenity.ISetEditValue]);
	ss.initClass($Serene1_Northwind_OrderDetailForm, $asm, {
		set_productID: function(value) {
			this.$3$ProductIDField = value;
		},
		set_unitPrice: function(value) {
			this.$3$UnitPriceField = value;
		},
		set_quantity: function(value) {
			this.$3$QuantityField = value;
		},
		set_discount: function(value) {
			this.$3$DiscountField = value;
		}
	}, Serenity.PrefixedContext);
	ss.initClass($Serene1_Northwind_OrderForm, $asm, {
		set_customerID: function(value) {
			this.$3$CustomerIDField = value;
		},
		set_orderDate: function(value) {
			this.$3$OrderDateField = value;
		},
		set_requiredDate: function(value) {
			this.$3$RequiredDateField = value;
		},
		set_employeeID: function(value) {
			this.$3$EmployeeIDField = value;
		},
		set_detailList: function(value) {
			this.$3$DetailListField = value;
		},
		set_shippedDate: function(value) {
			this.$3$ShippedDateField = value;
		},
		set_shipVia: function(value) {
			this.$3$ShipViaField = value;
		},
		set_freight: function(value) {
			this.$3$FreightField = value;
		},
		set_shipName: function(value) {
			this.$3$ShipNameField = value;
		},
		set_shipAddress: function(value) {
			this.$3$ShipAddressField = value;
		},
		set_shipCity: function(value) {
			this.$3$ShipCityField = value;
		},
		set_shipRegion: function(value) {
			this.$3$ShipRegionField = value;
		},
		set_shipPostalCode: function(value) {
			this.$3$ShipPostalCodeField = value;
		},
		set_shipCountry: function(value) {
			this.$3$ShipCountryField = value;
		}
	}, Serenity.PrefixedContext);
	ss.initEnum($Serene1_Northwind_OrderShippingState, $asm, { NotShipped: 0, Shipped: 1 });
	ss.initClass($Serene1_Northwind_PhoneEditor, $asm, {
		formatValue: function() {
			this.element.val(this.getFormattedValue());
		},
		getFormattedValue: function() {
			var value = this.element.val();
			if (this.get_multiple()) {
				return $Serene1_Northwind_PhoneEditor.$formatMulti(value, $Serene1_Northwind_PhoneEditor.$formatPhone);
			}
			return $Serene1_Northwind_PhoneEditor.$formatPhone(value);
		},
		get_multiple: function() {
			return this.$5$MultipleField;
		},
		set_multiple: function(value) {
			this.$5$MultipleField = value;
		},
		get_value: function() {
			return this.getFormattedValue();
		},
		set_value: function(value) {
			this.element.val(value);
		}
	}, Serenity.StringEditor, [Serenity.IStringValue]);
	ss.initClass($Serene1_Northwind_ProductForm, $asm, {
		set_productName: function(value) {
			this.$3$ProductNameField = value;
		},
		set_productImage: function(value) {
			this.$3$ProductImageField = value;
		},
		set_discontinued: function(value) {
			this.$3$DiscontinuedField = value;
		},
		set_supplierID: function(value) {
			this.$3$SupplierIDField = value;
		},
		set_categoryID: function(value) {
			this.$3$CategoryIDField = value;
		},
		set_quantityPerUnit: function(value) {
			this.$3$QuantityPerUnitField = value;
		},
		set_unitPrice: function(value) {
			this.$3$UnitPriceField = value;
		},
		set_unitsInStock: function(value) {
			this.$3$UnitsInStockField = value;
		},
		set_unitsOnOrder: function(value) {
			this.$3$UnitsOnOrderField = value;
		},
		set_reorderLevel: function(value) {
			this.$3$ReorderLevelField = value;
		}
	}, Serenity.PrefixedContext);
	ss.initClass($Serene1_Northwind_RegionDialog, $asm, {}, Serenity.EntityDialog, [Serenity.IDialog, Serenity.IEditDialog, Serenity.IAsyncInit]);
	ss.initClass($Serene1_Northwind_RegionForm, $asm, {
		set_regionID: function(value) {
			this.$3$RegionIDField = value;
		},
		set_regionDescription: function(value) {
			this.$3$RegionDescriptionField = value;
		}
	}, Serenity.PrefixedContext);
	ss.initClass($Serene1_Northwind_RegionGrid, $asm, {}, Serenity.EntityGrid, [Serenity.IDataGrid, Serenity.IAsyncInit]);
	ss.initClass($Serene1_Northwind_ShipperDialog, $asm, {}, Serenity.EntityDialog, [Serenity.IDialog, Serenity.IEditDialog, Serenity.IAsyncInit]);
	ss.initClass($Serene1_Northwind_ShipperForm, $asm, {
		set_companyName: function(value) {
			this.$3$CompanyNameField = value;
		},
		set_phone: function(value) {
			this.$3$PhoneField = value;
		}
	}, Serenity.PrefixedContext);
	ss.initClass($Serene1_Northwind_ShipperFormatter, $asm, {
		format: function(ctx) {
			return "<span class='shipper-symbol shipper-" + ss.replaceAllString(ss.coalesce(ss.safeCast(ctx.value, String), ''), ' ', '') + "'>" + Q.htmlEncode(ctx.value) + '</span>';
		}
	}, null, [Serenity.ISlickFormatter]);
	ss.initClass($Serene1_Northwind_ShipperGrid, $asm, {}, Serenity.EntityGrid, [Serenity.IDataGrid, Serenity.IAsyncInit]);
	ss.initClass($Serene1_Northwind_SupplierDialog, $asm, {}, Serenity.EntityDialog, [Serenity.IDialog, Serenity.IEditDialog, Serenity.IAsyncInit]);
	ss.initClass($Serene1_Northwind_SupplierForm, $asm, {
		set_companyName: function(value) {
			this.$3$CompanyNameField = value;
		},
		set_contactName: function(value) {
			this.$3$ContactNameField = value;
		},
		set_contactTitle: function(value) {
			this.$3$ContactTitleField = value;
		},
		set_address: function(value) {
			this.$3$AddressField = value;
		},
		set_city: function(value) {
			this.$3$CityField = value;
		},
		set_region: function(value) {
			this.$3$RegionField = value;
		},
		set_postalCode: function(value) {
			this.$3$PostalCodeField = value;
		},
		set_country: function(value) {
			this.$3$CountryField = value;
		},
		set_phone: function(value) {
			this.$3$PhoneField = value;
		},
		set_fax: function(value) {
			this.$3$FaxField = value;
		},
		set_homePage: function(value) {
			this.$3$HomePageField = value;
		}
	}, Serenity.PrefixedContext);
	ss.initClass($Serene1_Northwind_SupplierGrid, $asm, {
		createToolbarExtensions: function() {
			Serenity.EntityGrid.prototype.createToolbarExtensions.call(this);
			var $t2 = ss.mkdel(this, function(e) {
				e.appendTo(this.toolbar.element).attr('placeholder', '--- ' + Q.text('Db.Northwind.Supplier.Country') + ' ---');
			});
			var $t1 = Serenity.LookupEditorOptions.$ctor();
			$t1.lookupKey = 'Northwind.SupplierCountry';
			this.$country = Serenity.Widget.create(Serenity.LookupEditor).call(null, $t2, $t1, null);
			Serenity.WX.change(this.$country, ss.mkdel(this, function(e1) {
				this.refresh();
			}));
		},
		onViewSubmit: function() {
			if (!Serenity.DataGrid.prototype.onViewSubmit.call(this)) {
				return false;
			}
			this.setEquality('Country', this.$country.get_value());
			return true;
		}
	}, Serenity.EntityGrid, [Serenity.IDataGrid, Serenity.IAsyncInit]);
	ss.initClass($Serene1_Northwind_TerritoryDialog, $asm, {}, Serenity.EntityDialog, [Serenity.IDialog, Serenity.IEditDialog, Serenity.IAsyncInit]);
	ss.initClass($Serene1_Northwind_TerritoryForm, $asm, {
		set_territoryID: function(value) {
			this.$3$TerritoryIDField = value;
		},
		set_territoryDescription: function(value) {
			this.$3$TerritoryDescriptionField = value;
		},
		set_regionID: function(value) {
			this.$3$RegionIDField = value;
		}
	}, Serenity.PrefixedContext);
	ss.initClass($Serene1_Northwind_TerritoryGrid, $asm, {
		createToolbarExtensions: function() {
			Serenity.EntityGrid.prototype.createToolbarExtensions.call(this);
			var $t2 = ss.mkdel(this, function(e) {
				e.appendTo(this.toolbar.element).attr('placeholder', '--- ' + Q.text('Db.Northwind.Territory.RegionDescription') + ' ---');
			});
			var $t1 = Serenity.LookupEditorOptions.$ctor();
			$t1.lookupKey = 'Northwind.Region';
			this.$region = Serenity.Widget.create(Serenity.LookupEditor).call(null, $t2, $t1, null);
			Serenity.WX.change(this.$region, ss.mkdel(this, function(e1) {
				this.refresh();
			}));
		},
		onViewSubmit: function() {
			if (!Serenity.DataGrid.prototype.onViewSubmit.call(this)) {
				return false;
			}
			this.setEquality('RegionID', Q.toId(this.$region.get_value()));
			return true;
		}
	}, Serenity.EntityGrid, [Serenity.IDataGrid, Serenity.IAsyncInit]);
	ss.initClass($Serenity_HtmlBasicContentEditor, $asm, {
		getConfig: function() {
			var config = Serenity.HtmlContentEditor.prototype.getConfig.call(this);
			config.removeButtons += ',Cut,Copy,Paste,BulletedList,NumberedList,Indent,Outdent,SpecialChar,Subscript,Superscript,Styles,PasteText,PasteFromWord,Strike,Link,Unlink,CreatePlaceholder,Image,Table,HorizontalRule,Source,Maximize,Format,Font,FontSize,Anchor,Blockquote,CreatePlaceholder,BGColor,JustifyLeft,JustifyCenter,JustifyRight,JustifyBlock,Superscript,RemoveFormat';
			config.removePlugins += ',elementspath';
			return config;
		}
	}, Serenity.HtmlContentEditor, [Serenity.IStringValue]);
	ss.setMetadata($Serene1_Administration_LanguageDialog, { attr: [new Serenity.IdPropertyAttribute('Id'), new Serenity.NamePropertyAttribute('LanguageName'), new Serenity.FormKeyAttribute('Administration.Language'), new Serenity.LocalTextPrefixAttribute('Administration.Language'), new Serenity.ServiceAttribute('Administration/Language')] });
	ss.setMetadata($Serene1_Administration_LanguageGrid, { attr: [new Serenity.ColumnsKeyAttribute('Administration.Language'), new Serenity.IdPropertyAttribute('Id'), new Serenity.NamePropertyAttribute('LanguageName'), new Serenity.DialogTypeAttribute($Serene1_Administration_LanguageDialog), new Serenity.LocalTextPrefixAttribute('Administration.Language'), new Serenity.ServiceAttribute('Administration/Language')] });
	ss.setMetadata($Serene1_Administration_PermissionCheckEditor, { attr: [new Serenity.EditorAttribute(), new Serenity.IdPropertyAttribute('Key')] });
	ss.setMetadata($Serene1_Administration_PermissionModuleEditor, { attr: [new Serenity.EditorAttribute()] });
	ss.setMetadata($Serene1_Administration_RoleCheckEditor, { attr: [new Serenity.EditorAttribute()] });
	ss.setMetadata($Serene1_Administration_TranslationGrid, { attr: [new Serenity.ColumnsKeyAttribute('Administration.Translation'), new Serenity.IdPropertyAttribute('Key'), new Serenity.LocalTextPrefixAttribute('Administration.Translation'), new Serenity.ServiceAttribute('Administration/Translation')] });
	ss.setMetadata($Serene1_BasicSamples_ChartInDialog, { attr: [new Serenity.ResizableAttribute(), new Serenity.MaximizableAttribute()] });
	ss.setMetadata($Serene1_BasicSamples_CloneableEntityDialog, { attr: [new Serenity.ResponsiveAttribute(), new Serenity.MaximizableAttribute()] });
	ss.setMetadata($Serene1_BasicSamples_CloneableEntityGrid, { attr: [new Serenity.DialogTypeAttribute($Serene1_BasicSamples_CloneableEntityDialog)] });
	ss.setMetadata($Serene1_BasicSamples_FilteredLookupDetailEditor, { attr: [new Serenity.DialogTypeAttribute($Serene1_BasicSamples_FilteredLookupOrderDetailDialog)] });
	ss.setMetadata($Serene1_BasicSamples_FilteredLookupInDetailDialog, { attr: [new Serenity.IdPropertyAttribute('OrderID'), new Serenity.NamePropertyAttribute('OrderID'), new Serenity.LocalTextPrefixAttribute('Northwind.Order'), new Serenity.ServiceAttribute('Northwind/Order'), new Serenity.FormKeyAttribute('BasicSamples.FilteredLookupInDetail'), new Serenity.ResponsiveAttribute()] });
	ss.setMetadata($Serene1_BasicSamples_FilteredLookupInDetailGrid, { attr: [new Serenity.DialogTypeAttribute($Serene1_BasicSamples_FilteredLookupInDetailDialog)] });
	ss.setMetadata($Serene1_BasicSamples_LookupFilterByMultipleDialog, { attr: [new Serenity.ResponsiveAttribute(), new Serenity.MaximizableAttribute(), new Serenity.FormKeyAttribute('BasicSamples.LookupFilterByMultiple')] });
	ss.setMetadata($Serene1_BasicSamples_LookupFilterByMultipleGrid, { attr: [new Serenity.DialogTypeAttribute($Serene1_BasicSamples_LookupFilterByMultipleDialog)] });
	ss.setMetadata($Serene1_BasicSamples_MultiColumnGrid, { attr: [new Serenity.DialogTypeAttribute($Serene1_BasicSamples_MultiColumnDialog)] });
	ss.setMetadata($Serene1_BasicSamples_MultiColumnResponsiveDialog, { attr: [new Serenity.ResponsiveAttribute()] });
	ss.setMetadata($Serene1_BasicSamples_MultiColumnResponsiveGrid, { attr: [new Serenity.DialogTypeAttribute($Serene1_BasicSamples_MultiColumnResponsiveDialog)] });
	ss.setMetadata($Serene1_BasicSamples_ResponsiveDialog, { attr: [new Serenity.IdPropertyAttribute('OrderID'), new Serenity.NamePropertyAttribute('OrderID'), new Serenity.FormKeyAttribute('Northwind.Order'), new Serenity.LocalTextPrefixAttribute('Northwind.Order'), new Serenity.ServiceAttribute('Northwind/Order'), new Serenity.ResponsiveAttribute(), new Serenity.MaximizableAttribute()] });
	ss.setMetadata($Serene1_BasicSamples_ResponsiveGrid, { attr: [new Serenity.DialogTypeAttribute($Serene1_BasicSamples_ResponsiveDialog)] });
	ss.setMetadata($Serene1_BasicSamples_ViewWithoutIDGrid, { attr: [new Serenity.IdPropertyAttribute('__id'), new Serenity.ColumnsKeyAttribute('Northwind.SalesByCategory'), new Serenity.NamePropertyAttribute('CategoryName'), new Serenity.LocalTextPrefixAttribute('Northwind.SalesByCategory'), new Serenity.ServiceAttribute('Northwind/SalesByCategory')] });
	ss.setMetadata($Serene1_Common_GridEditorBase, { attr: [new Serenity.ElementAttribute('<div/>'), new Serenity.EditorAttribute(), new Serenity.IdPropertyAttribute('__id')] });
	ss.setMetadata($Serene1_Common_GridEditorDialog, { attr: [new Serenity.IdPropertyAttribute('__id')] });
	ss.setMetadata($Serene1_Membership_ChangePasswordPanel, { attr: [new Serenity.PanelAttribute(), new Serenity.FormKeyAttribute('Membership.ChangePassword')] });
	ss.setMetadata($Serene1_Membership_ForgotPasswordPanel, { attr: [new Serenity.PanelAttribute(), new Serenity.FormKeyAttribute('Membership.ForgotPassword')] });
	ss.setMetadata($Serene1_Membership_LoginPanel, { attr: [new Serenity.FormKeyAttribute('Membership.Login')] });
	ss.setMetadata($Serene1_Membership_ResetPasswordPanel, { attr: [new Serenity.PanelAttribute(), new Serenity.FormKeyAttribute('Membership.ResetPassword')] });
	ss.setMetadata($Serene1_Membership_SignUpPanel, { attr: [new Serenity.PanelAttribute(), new Serenity.FormKeyAttribute('Membership.SignUp')] });
	ss.setMetadata($Serene1_Northwind_CategoryDialog, { attr: [new Serenity.IdPropertyAttribute('CategoryID'), new Serenity.NamePropertyAttribute('CategoryName'), new Serenity.FormKeyAttribute('Northwind.Category'), new Serenity.LocalTextPrefixAttribute('Northwind.Category'), new Serenity.ServiceAttribute('Northwind/Category')] });
	ss.setMetadata($Serene1_Northwind_CategoryGrid, { attr: [new Serenity.ColumnsKeyAttribute('Northwind.Category'), new Serenity.IdPropertyAttribute('CategoryID'), new Serenity.NamePropertyAttribute('CategoryName'), new Serenity.DialogTypeAttribute($Serene1_Northwind_CategoryDialog), new Serenity.LocalTextPrefixAttribute('Northwind.Category'), new Serenity.ServiceAttribute('Northwind/Category')] });
	ss.setMetadata($Serene1_Northwind_CustomerCustomerDemoDialog, { attr: [new Serenity.IdPropertyAttribute('ID'), new Serenity.NamePropertyAttribute('CustomerID'), new Serenity.FormKeyAttribute('Northwind.CustomerCustomerDemo'), new Serenity.LocalTextPrefixAttribute('Northwind.CustomerCustomerDemo'), new Serenity.ServiceAttribute('Northwind/CustomerCustomerDemo')] });
	ss.setMetadata($Serene1_Northwind_CustomerCustomerDemoGrid, { attr: [new Serenity.IdPropertyAttribute('ID'), new Serenity.NamePropertyAttribute('CustomerID'), new Serenity.DialogTypeAttribute($Serene1_Northwind_CustomerCustomerDemoDialog), new Serenity.LocalTextPrefixAttribute('Northwind.CustomerCustomerDemo'), new Serenity.ServiceAttribute('Northwind/CustomerCustomerDemo')] });
	ss.setMetadata($Serene1_Northwind_CustomerDemographicDialog, { attr: [new Serenity.IdPropertyAttribute('ID'), new Serenity.NamePropertyAttribute('CustomerTypeID'), new Serenity.FormKeyAttribute('Northwind.CustomerDemographic'), new Serenity.LocalTextPrefixAttribute('Northwind.CustomerDemographic'), new Serenity.ServiceAttribute('Northwind/CustomerDemographic')] });
	ss.setMetadata($Serene1_Northwind_CustomerDemographicGrid, { attr: [new Serenity.IdPropertyAttribute('ID'), new Serenity.NamePropertyAttribute('CustomerTypeID'), new Serenity.DialogTypeAttribute($Serene1_Northwind_CustomerDemographicDialog), new Serenity.LocalTextPrefixAttribute('Northwind.CustomerDemographic'), new Serenity.ServiceAttribute('Northwind/CustomerDemographic')] });
	ss.setMetadata($Serene1_Northwind_CustomerDialog, { attr: [new Serenity.IdPropertyAttribute('ID'), new Serenity.NamePropertyAttribute('CustomerID'), new Serenity.FlexifyAttribute(), new Serenity.MaximizableAttribute(), new Serenity.FormKeyAttribute('Northwind.Customer'), new Serenity.LocalTextPrefixAttribute('Northwind.Customer'), new Serenity.ServiceAttribute('Northwind/Customer')] });
	ss.setMetadata($Serene1_Northwind_CustomerGrid, { attr: [new Serenity.ColumnsKeyAttribute('Northwind.Customer'), new Serenity.FilterableAttribute(), new Serenity.IdPropertyAttribute('ID'), new Serenity.NamePropertyAttribute('CustomerID'), new Serenity.DialogTypeAttribute($Serene1_Northwind_CustomerDialog), new Serenity.LocalTextPrefixAttribute('Northwind.Customer'), new Serenity.ServiceAttribute('Northwind/Customer')] });
	ss.setMetadata($Serene1_Northwind_CustomerOrdersGrid, { attr: [new Serenity.DialogTypeAttribute($Serene1_Northwind_CustomerOrderDialog)] });
	ss.setMetadata($Serene1_Northwind_EmployeeDialog, { attr: [new Serenity.IdPropertyAttribute('EmployeeID'), new Serenity.NamePropertyAttribute('LastName'), new Serenity.FormKeyAttribute('Northwind.Employee'), new Serenity.LocalTextPrefixAttribute('Northwind.Employee'), new Serenity.ServiceAttribute('Northwind/Employee')] });
	ss.setMetadata($Serene1_Northwind_EmployeeFormatter, { members: [{ attr: [new Serenity.OptionAttribute()], name: 'GenderProperty', type: 16, returnType: String, getter: { name: 'get_GenderProperty', type: 8, sname: 'get_genderProperty', returnType: String, params: [] }, setter: { name: 'set_GenderProperty', type: 8, sname: 'set_genderProperty', returnType: Object, params: [String] } }] });
	ss.setMetadata($Serene1_Northwind_EmployeeGrid, { attr: [new Serenity.IdPropertyAttribute('EmployeeID'), new Serenity.NamePropertyAttribute('LastName'), new Serenity.DialogTypeAttribute($Serene1_Northwind_EmployeeDialog), new Serenity.LocalTextPrefixAttribute('Northwind.Employee'), new Serenity.ServiceAttribute('Northwind/Employee')] });
	ss.setMetadata($Serene1_Northwind_EmployeeTerritoryDialog, { attr: [new Serenity.IdPropertyAttribute('EmployeeID'), new Serenity.NamePropertyAttribute('TerritoryID'), new Serenity.FormKeyAttribute('Northwind.EmployeeTerritory'), new Serenity.LocalTextPrefixAttribute('Northwind.EmployeeTerritory'), new Serenity.ServiceAttribute('Northwind/EmployeeTerritory')] });
	ss.setMetadata($Serene1_Northwind_EmployeeTerritoryGrid, { attr: [new Serenity.IdPropertyAttribute('EmployeeID'), new Serenity.NamePropertyAttribute('TerritoryID'), new Serenity.DialogTypeAttribute($Serene1_Northwind_EmployeeTerritoryDialog), new Serenity.LocalTextPrefixAttribute('Northwind.EmployeeTerritory'), new Serenity.ServiceAttribute('Northwind/EmployeeTerritory')] });
	ss.setMetadata($Serene1_Northwind_Gender, { attr: [new Serenity.EnumKeyAttribute('Serene1.Northwind.Entities.Gender')] });
	ss.setMetadata($Serene1_Northwind_NotesEditor, { attr: [new Serenity.EditorAttribute(), new Serenity.ElementAttribute('<div/>')] });
	ss.setMetadata($Serene1_Northwind_OrderDetailDialog, { attr: [new Serenity.FormKeyAttribute('Northwind.OrderDetail'), new Serenity.LocalTextPrefixAttribute('Northwind.OrderDetail')] });
	ss.setMetadata($Serene1_Northwind_OrderDetailsEditor, { attr: [new Serenity.ColumnsKeyAttribute('Northwind.OrderDetail'), new Serenity.DialogTypeAttribute($Serene1_Northwind_OrderDetailDialog), new Serenity.LocalTextPrefixAttribute('Northwind.OrderDetail')] });
	ss.setMetadata($Serene1_Northwind_OrderDialog, { attr: [new Serenity.IdPropertyAttribute('OrderID'), new Serenity.NamePropertyAttribute('OrderID'), new Serenity.FlexifyAttribute(), new Serenity.MaximizableAttribute(), new Serenity.FormKeyAttribute('Northwind.Order'), new Serenity.LocalTextPrefixAttribute('Northwind.Order'), new Serenity.ServiceAttribute('Northwind/Order')] });
	ss.setMetadata($Serene1_Northwind_OrderGrid, { attr: [new Serenity.ColumnsKeyAttribute('Northwind.Order'), new Serenity.IdPropertyAttribute('OrderID'), new Serenity.DialogTypeAttribute($Serene1_Northwind_OrderDialog), new Serenity.LocalTextPrefixAttribute('Northwind.Order'), new Serenity.ServiceAttribute('Northwind/Order')] });
	ss.setMetadata($Serene1_Northwind_OrderShippingState, { attr: [new Serenity.EnumKeyAttribute('Northwind.OrderShippingState')] });
	ss.setMetadata($Serene1_Northwind_PhoneEditor, { attr: [new Serenity.EditorAttribute()], members: [{ attr: [new Serenity.OptionAttribute()], name: 'Multiple', type: 16, returnType: Boolean, getter: { name: 'get_Multiple', type: 8, sname: 'get_multiple', returnType: Boolean, params: [] }, setter: { name: 'set_Multiple', type: 8, sname: 'set_multiple', returnType: Object, params: [Boolean] } }] });
	ss.setMetadata($Serene1_Northwind_ProductDialog, { attr: [new Serenity.IdPropertyAttribute('ProductID'), new Serenity.NamePropertyAttribute('ProductName'), new Serenity.FormKeyAttribute('Northwind.Product'), new Serenity.LocalTextPrefixAttribute('Northwind.Product'), new Serenity.ServiceAttribute('Northwind/Product')] });
	ss.setMetadata($Serene1_Northwind_ProductGrid, { attr: [new Serenity.ColumnsKeyAttribute('Northwind.Product'), new Serenity.FilterableAttribute(), new Serenity.IdPropertyAttribute('ProductID'), new Serenity.NamePropertyAttribute('ProductName'), new Serenity.DialogTypeAttribute($Serene1_Northwind_ProductDialog), new Serenity.LocalTextPrefixAttribute('Northwind.Product'), new Serenity.ServiceAttribute('Northwind/Product')] });
	ss.setMetadata($Serene1_Northwind_RegionDialog, { attr: [new Serenity.IdPropertyAttribute('RegionID'), new Serenity.NamePropertyAttribute('RegionDescription'), new Serenity.FormKeyAttribute('Northwind.Region'), new Serenity.LocalTextPrefixAttribute('Northwind.Region'), new Serenity.ServiceAttribute('Northwind/Region')] });
	ss.setMetadata($Serene1_Northwind_RegionGrid, { attr: [new Serenity.ColumnsKeyAttribute('Northwind.Region'), new Serenity.IdPropertyAttribute('RegionID'), new Serenity.NamePropertyAttribute('RegionDescription'), new Serenity.DialogTypeAttribute($Serene1_Northwind_RegionDialog), new Serenity.LocalTextPrefixAttribute('Northwind.Region'), new Serenity.ServiceAttribute('Northwind/Region')] });
	ss.setMetadata($Serene1_Northwind_ShipperDialog, { attr: [new Serenity.IdPropertyAttribute('ShipperID'), new Serenity.NamePropertyAttribute('CompanyName'), new Serenity.FormKeyAttribute('Northwind.Shipper'), new Serenity.LocalTextPrefixAttribute('Northwind.Shipper'), new Serenity.ServiceAttribute('Northwind/Shipper')] });
	ss.setMetadata($Serene1_Northwind_ShipperGrid, { attr: [new Serenity.ColumnsKeyAttribute('Northwind.Shipper'), new Serenity.IdPropertyAttribute('ShipperID'), new Serenity.NamePropertyAttribute('CompanyName'), new Serenity.DialogTypeAttribute($Serene1_Northwind_ShipperDialog), new Serenity.LocalTextPrefixAttribute('Northwind.Shipper'), new Serenity.ServiceAttribute('Northwind/Shipper')] });
	ss.setMetadata($Serene1_Northwind_SupplierDialog, { attr: [new Serenity.IdPropertyAttribute('SupplierID'), new Serenity.NamePropertyAttribute('CompanyName'), new Serenity.FormKeyAttribute('Northwind.Supplier'), new Serenity.LocalTextPrefixAttribute('Northwind.Supplier'), new Serenity.ServiceAttribute('Northwind/Supplier')] });
	ss.setMetadata($Serene1_Northwind_SupplierGrid, { attr: [new Serenity.ColumnsKeyAttribute('Northwind.Supplier'), new Serenity.FilterableAttribute(), new Serenity.IdPropertyAttribute('SupplierID'), new Serenity.NamePropertyAttribute('CompanyName'), new Serenity.DialogTypeAttribute($Serene1_Northwind_SupplierDialog), new Serenity.LocalTextPrefixAttribute('Northwind.Supplier'), new Serenity.ServiceAttribute('Northwind/Supplier')] });
	ss.setMetadata($Serene1_Northwind_TerritoryDialog, { attr: [new Serenity.IdPropertyAttribute('ID'), new Serenity.NamePropertyAttribute('TerritoryID'), new Serenity.FormKeyAttribute('Northwind.Territory'), new Serenity.LocalTextPrefixAttribute('Northwind.Territory'), new Serenity.ServiceAttribute('Northwind/Territory')] });
	ss.setMetadata($Serene1_Northwind_TerritoryGrid, { attr: [new Serenity.ColumnsKeyAttribute('Northwind.Territory'), new Serenity.IdPropertyAttribute('ID'), new Serenity.NamePropertyAttribute('TerritoryID'), new Serenity.DialogTypeAttribute($Serene1_Northwind_TerritoryDialog), new Serenity.LocalTextPrefixAttribute('Northwind.Territory'), new Serenity.ServiceAttribute('Northwind/Territory')] });
	ss.setMetadata($Serenity_HtmlBasicContentEditor, { attr: [new Serenity.EditorAttribute(), new System.ComponentModel.DisplayNameAttribute('Html Content (Basic Set)'), new Serenity.OptionsTypeAttribute(Serenity.HtmlContentEditorOptions), new Serenity.ElementAttribute('<textarea />')] });
	(function() {
		Q.Config.rootNamespaces.push('Serene1');
	})();
})();
