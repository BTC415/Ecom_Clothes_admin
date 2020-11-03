import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {NavigationEnd, NavigationStart, Router, RouterModule} from '@angular/router'
import {ReactiveFormsModule} from "@angular/forms"

import {NgScrollbarModule} from 'ngx-scrollbar'
import {DragDropModule} from '@angular/cdk/drag-drop'
import {A11yModule} from '@angular/cdk/a11y'
import {
  AddModule,
  CaretDownModule,
  HomeModule,
  SearchModule,
  AccountModule,
  ChatModule,
  NotificationModule as NotificationIconModule,
  CloudSatelliteModule,
  ApiModule,
  ApertureModule,
  UserModule,
  ToolsModule,
  ApplicationModule,
  HelpModule,
  ArrowUpModule,
  ArrowDownModule,
  OverflowMenuHorizontalModule,
  OverflowMenuVerticalModule,
  CloudDataOpsModule,
  VirtualPrivateCloudAltModule,
  CheckmarkOutlineModule,
  CaretRightModule,
  CaretLeftModule,
  ArrowRightModule,
  ArrowLeftModule,
  RenewModule,
  AlarmModule,
  MinimizeModule,
  CloudDownloadModule,
  AnalyticsModule,
  ActivityModule,
  DashboardModule,
  TaskModule,
  CatalogModule,
  DocumentModule,
  EmailModule,
  SendAltModule,
  SendModule,
  DashboardReferenceModule,
  UserAdminModule,
  UserAvatarModule,
  FolderModule,
  ImageSearchModule,
  ErrorModule,
  PhraseSentimentModule,
  TableSplitModule,
  ChartColumnModule,
  MagicWandModule,
  TextTrackingModule,
  TextCreationModule,
  TrashCanModule,
  MenuModule,
  RadioButtonModule,
  RadioButtonCheckedModule,
  SettingsAdjustModule,
  SettingsModule,
  CheckboxCheckedModule,
  CloudAppModule,
  BullhornModule,
  BuildingInsights_1Module,
  TagModule as TagModuleIcon,
  TimeModule,
  ChevronDownModule,
  ChevronUpModule,
  DraggableModule,
  ArchiveModule,
  MaximizeModule,
  ImageModule,
  StarModule,
  FolderSharedModule,
  RecentlyViewedModule,
  HashtagModule,
  DownloadModule,
  ShareModule,
  MoveModule,
  TableOfContentsModule,
  UploadModule,
  PackageModule,
  ChevronLeftModule,
  ChevronRightModule,
  AttachmentModule,
  FlagModule,
  FlagFilledModule,
  TextBoldModule,
  TextItalicModule,
  TextUnderlineModule,
  PrinterModule,
  OpenPanelFilledLeftModule,
  OpenPanelLeftModule,
  LockedModule,
  InformationModule, PhoneModule, EditModule, SubtractModule, MoneyModule, FaceActivatedModule,
} from "@carbon/icons-angular"
import {FlexLayoutModule} from '@angular/flex-layout'

import {ResizableModule} from 'angular-resizable-element'
import {BemModule} from 'angular-bem'
import {NgbDropdownModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap'

import {AppSidenavComponent} from "./app-sidenav/app-sidenav/app-sidenav.component"
import {AppSidenavContainerComponent} from "./app-sidenav/app-sidenav-container/app-sidenav-container.component"

import {
  GridModule,
  ListModule,
  TabsModule,
  TilesModule,
  InputModule,
  ButtonModule,
  TagModule,
  BreadcrumbModule,
  CheckboxModule,
  ComboBoxModule,
  AccordionModule,
  TableModule,
  ToggleModule,
  DatePickerModule,
  SearchModule as SearchModuleComponent,
  ContentSwitcherModule,
  SkeletonModule,
  DialogModule,
  LinkModule,
  NotificationModule,
} from 'carbon-components-angular'
import {LayoutComponent} from './layout/layout.component'
import {LayoutMiniSidebarComponent} from './layout/layout-mini-sidebar/layout-mini-sidebar.component'
import {LayoutSidebarComponent} from './layout/layout-sidebar/layout-sidebar.component'

import {AppMenuComponent} from "./app-menu/app-menu/app-menu.component"
import {AppMenuHeaderComponent} from "./app-menu/app-menu-header/app-menu-header.component"
import {AppMenuItemComponent} from "./app-menu/app-menu-item/app-menu-item.component"
import {IbmIconComponent} from './ibm-icon/ibm-icon.component'
import {AppTableComponent} from './app-table/app-table.component'
import {AppHeaderComponent} from './layout/app-header/app-header.component'
import {AppHeaderTitleComponent} from './layout/app-header/app-header-title/app-header-title.component'
import {AppHeaderToolsComponent} from './layout/app-header/app-header-tools/app-header-tools.component'
import {AppThemeSettingsComponent} from './layout/app-theme-settings/app-theme-settings.component'
import {AppLayoutHeaderComponent} from './layout/app-layout-header/app-layout-header.component'
import {AppSearchComponent} from './app-search/app-search.component'
import {AppTasksComponent} from './app-tasks/app-tasks.component'

import {InputTypeAdvancedPipe} from "./pipes/input-type-advanced.pipe"
import {TextHiglightPipe} from "./pipes/text-higlight.pipe"
import {AppLayoutDividedComponent} from './layout/auth/app-layout-divided/app-layout-divided.component'
import {AppLayoutDividedAltComponent} from './layout/auth/app-layout-divided-alt/app-layout-divided-alt.component'
import {AuthWelcomeScreenComponent} from "./layout/auth/auth-welcome-screen/auth-welcome-screen.component"
import {AppLayoutDividedFullComponent} from './layout/auth/app-layout-divided-full/app-layout-divided-full.component'
import {AppLayoutBasicComponent} from './layout/auth/app-layout-basic/app-layout-basic.component'
import {AppLockScreenComponent} from './app-lock-screen/app-lock-screen.component'


const MainModules = [
  RouterModule,
  FlexLayoutModule,
  ResizableModule,
  BemModule,
  NgbDropdownModule,
  NgbTooltipModule,
  DragDropModule,
  A11yModule,
  ReactiveFormsModule,
]

const CarbonModules = [
  GridModule,
  ListModule,
  TabsModule,
  TilesModule,
  InputModule,
  ButtonModule,
  TagModule,
  BreadcrumbModule,
  CheckboxModule,
  ComboBoxModule,
  AccordionModule,
  TableModule,
  ToggleModule,
  DatePickerModule,
  SearchModuleComponent,
  ContentSwitcherModule,
  SkeletonModule,
  DialogModule,
  MaximizeModule,
  LinkModule,
  NotificationModule,
]

const CarbonIconModules = [
  CaretDownModule,
  AddModule,
  HomeModule,
  SearchModule,
  AccountModule,
  ChatModule,
  NotificationIconModule,
  CloudSatelliteModule,
  ApiModule,
  ApertureModule,
  UserModule,
  ToolsModule,
  ApplicationModule,
  HelpModule,
  ArrowUpModule,
  ArrowDownModule,
  OverflowMenuHorizontalModule,
  OverflowMenuVerticalModule,
  CloudDataOpsModule,
  VirtualPrivateCloudAltModule,
  CheckmarkOutlineModule,
  CaretRightModule,
  CaretLeftModule,
  ArrowRightModule,
  ArrowLeftModule,
  RenewModule,
  AlarmModule,
  MinimizeModule,
  CloudDownloadModule,
  AnalyticsModule,
  ActivityModule,
  DashboardModule,
  TaskModule,
  CatalogModule,
  DocumentModule,
  EmailModule,
  SendAltModule,
  SendModule,
  DashboardReferenceModule,
  UserAdminModule,
  UserAvatarModule,
  FolderModule,
  ImageSearchModule,
  ErrorModule,
  PhraseSentimentModule,
  TableSplitModule,
  ChartColumnModule,
  MagicWandModule,
  TextTrackingModule,
  TextCreationModule,
  TrashCanModule,
  MenuModule,
  RadioButtonModule,
  RadioButtonCheckedModule,
  SettingsAdjustModule,
  SettingsModule,
  CheckboxCheckedModule,
  CloudAppModule,
  BullhornModule,
  BuildingInsights_1Module,
  TagModuleIcon,
  TimeModule,
  ChevronDownModule,
  ChevronUpModule,
  DraggableModule,
  ArchiveModule,
  ImageModule,
  StarModule,
  FolderSharedModule,
  RecentlyViewedModule,
  HashtagModule,
  DownloadModule,
  ShareModule,
  MoveModule,
  TableOfContentsModule,
  UploadModule,
  PackageModule,
  ChevronLeftModule,
  ChevronRightModule,
  AttachmentModule,
  FlagModule,
  FlagFilledModule,
  TextBoldModule,
  TextItalicModule,
  TextUnderlineModule,
  PrinterModule,
  OpenPanelFilledLeftModule,
  OpenPanelLeftModule,
  LockedModule,
  InformationModule,
  PhoneModule,
  EditModule,
  SubtractModule,
  MoneyModule,
  FaceActivatedModule,
]

const Components = [
  AppSidenavComponent,
  AppSidenavContainerComponent,
  LayoutComponent,
  LayoutMiniSidebarComponent,
  LayoutSidebarComponent,
  AppMenuComponent,
  AppMenuHeaderComponent,
  AppMenuItemComponent,
  IbmIconComponent,
  AppTableComponent,
  AppHeaderComponent,
  AppHeaderTitleComponent,
  AppHeaderToolsComponent,
  AppThemeSettingsComponent,
  AppLayoutHeaderComponent,
  AppSearchComponent,
  AppTasksComponent,
  AppLayoutDividedComponent,
  AppLayoutDividedAltComponent,
  AuthWelcomeScreenComponent,
  AppLayoutDividedFullComponent,
  AppLayoutBasicComponent,
  AppLockScreenComponent,
]

const Pipes = [
  InputTypeAdvancedPipe,
  TextHiglightPipe,
]

@NgModule({
  imports: [
    CommonModule,
    NgScrollbarModule.withConfig({
      visibility: 'hover',
    }),
    ...MainModules,
    ...CarbonIconModules,
    ...CarbonModules,

  ],
  declarations: [
    ...Components,
    ...Pipes,
  ],
  exports: [
    NgScrollbarModule,
    ...Components,
    ...MainModules,
    ...CarbonIconModules,
    ...CarbonModules,
    ...Pipes,

  ]
})
export class SharedModule {
  constructor() {

  }
}
