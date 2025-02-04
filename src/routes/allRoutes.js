import React from "react"
import { Redirect } from "react-router-dom"

//Dashboard
import Dashboard from "../pages/Dashboard/index";
import CredentialBreach from "../pages/Features/CredentialBreach/CredentialBreach"

// Calendar
import Calendar from "../pages/Calendar/index";

//Chat 
import Chat from "../pages/Chat/Chat";

//Email 
import EmailInbox from "../pages/Email/email-inbox";
import EmailRead from "../pages/Email/email-read";

//Invoice
import InvoicesList from "../pages/Invoices/invoices-list";
import InvoiceDetail from "../pages/Invoices/invoices-detail"

//Contact
import ContactsGrid from "../pages/Contacts/contacts-grid";
import ContactsList from "../pages/Contacts/ContactList/contacts-list";
import ContactsProfile from "../pages/Contacts/ContactsProfile/contacts-profile";

//Utility
import PagesStarter from "../pages/Utility/StarterPage";
import PageMaintenance from "../pages/Utility/PageMaintenance";
import PagesComingsoon from "../pages/Utility/PageComingsoon";
import PageTimeline from "../pages/Utility/PageTimeline";
import PageFaqs from "../pages/Utility/PageFaqs";
import PagePricing from "../pages/Utility/PagePricing/index";
import Error404 from "../pages/Utility/Error404";
import Error500 from "../pages/Utility/Error500";

// Ui Components
import UiAlert from "../pages/UiElements/UiAlert";
import UiButton from "../pages/UiElements/UiButton";
import UiCard from "../pages/UiElements/UiCard";
import UiCarousel from "../pages/UiElements/UiCarousel";
import UiDropdowns from "../pages/UiElements/UiDropdowns";
import UiGrid from "../pages/UiElements/UiGrid";
import UiImages from "../pages/UiElements/UiImages";
import UiModal from "../pages/UiElements/UiModals";
import UiDrawer from "../pages/UiElements/UiDrawer";
import UiProgressbar from "../pages/UiElements/UiProgressbar";
import UiTabsAccordions from "../pages/UiElements/UiTabsAccordions";
import UiTypography from "../pages/UiElements/UiTypography";
import UiVideo from "../pages/UiElements/UiVideo";
import UiGeneral from "../pages/UiElements/UiGeneral";
import UiColors from "../pages/UiElements/UiColors";

//Extended pages
import Lightbox from "../pages/Extended/Lightbox";
import Rangeslider from "../pages/Extended/Rangeslider";
import SweetAlert from "../pages/Extended/SweetAlert";
import SessionTimeout from "../pages/Extended/SessionTimeout";
import UiRating from "../pages/Extended/UiRating";
import Notifications from "../pages/Extended/Notifications";

//Forms
import FormElements from "../pages/Forms/FormElements/index";
import FormValidation from "../pages/Forms/FormValidation/";
import AdvancedPlugins from "../pages/Forms/AdvancedPlugins";
import FormEditors from "../pages/Forms/FormEditors";
import FormUpload from "../pages/Forms/FormUpload";
import FormWizard from "../pages/Forms/FormWizard";
import FormMask from "../pages/Forms/FormMask";

//Tables
import BasicTable from "../pages/Tables/BasicTables";
import DatatableTables from "../pages/Tables/DatatableTables";
import ResponsiveTables from "../pages/Tables/ResponsiveTables";
import EditableTables from "../pages/Tables/EditableTables";

//Charts
import Apexchart from "../pages/Charts/Apexcharts";
import EChart from "../pages/Charts/EChart";
import ChartjsChart from "../pages/Charts/ChartjsChart";
import KnobCharts from "../pages/Charts/KnobCharts";
import SparklineChart from "../pages/Charts/SparklineChart";

//Icons
import IconBoxicons from "../pages/Icons/IconBoxicons";
import IconMaterialdesign from "../pages/Icons/IconMaterialdesign";
import IconDripicons from "../pages/Icons/IconDripicons";
import IconFontawesome from "../pages/Icons/IconFontawesome";

// Maps
import MapsGoogle from "../pages/Maps/MapsGoogle"
import MapsVector from "../pages/Maps/MapsVector"
import MapsLeaflet from "../pages/Maps/MapsLeaflet"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import RegisterSucces from "../pages/Authentication/RegisterCheck"
import ForgetPwd from "../pages/Authentication/ForgetPassword"
import GoToEmail from "../pages/Authentication/GoToEmail"

//AuthenticationInner related pages
import PageLogin from "../pages/AuthenticationInner/PageLogin";
import PageRegister from "../pages/AuthenticationInner/PageRegister";
import RecoverPassword from "../pages/AuthenticationInner/RecoverPassword";
import LockScreen from "../pages/AuthenticationInner/LockScreen";
import ConfirmMail from "../pages/AuthenticationInner/ConfirmMail";
import EmailVerification from "../pages/AuthenticationInner/EmailVerification";
import TwoStepVerfication from "../pages/AuthenticationInner/TwoStepVerfication";
import userProfile from "../pages/Authentication/user-profile";
import UserProfile from "../pages/Contacts/ContactsProfile/userProfile";
import ProfileTab from "../pages/Contacts/ContactsProfile/ProfileTab";

import SubdomainFinder from "../pages/Features/SubdomainFinder/SubdomainFinder";
import PortScan from "../pages/Features/PORT Scanner/PortScan";
import DNSLookup from "../pages/Features/DNS Lookup/DNSLookup";
import ReverseIPLookup from "../pages/Features/Reverse_IP_Lookup/Reverse_IP_Lookup";
import ReverseDNSLookup from "../pages/Features/Reverse_DNS_Lookup/Reverse_DNS_Lookup";
import WHOisRecords from "../pages/Features/WHOIS Records/WHOisReacords";
import RegisterCheck from "../pages/Authentication/RegisterCheck";
import RegisterSuccess from "../pages/Authentication/RegisterSuccess";
import Dashboard2 from "../pages/Dashboard/Dashboard2";
import ScanSetting from "../pages/Features/Scan Setting/ScanSetting";
import Testlogin from "../pages/Authentication/Testlogin";
import AssetList from "../pages/Features/Asset Setting/AssetList";
import CheckForgotPassToken from "../pages/Authentication/CheckForgotPassToken";
import Subscription from "../pages/Features/Subscription/Subscription";
import Domain from "../pages/Features/Asset Setting/Feature/Domain";
import IP from "../pages/Features/Asset Setting/Feature/IP";
import Subdomain from "../pages/Features/Asset Setting/Feature/Subdomain";
import MobileApplication from "../pages/Features/Asset Setting/Feature/MobileApplication";
import SourceCode from "../pages/Features/Asset Setting/Feature/SourceCode";

const userRoutes = [

  //dashboard
  { path: "/dashboard", component: Dashboard2 },
  // { path: "/dashboard2", component: Dashboard },

  //profile
  // { path: "/profile", component: userProfile },

  // //Calendar
  // { path: "/apps-calendar", component: Calendar },

  // //Chat 
  // { path: "/apps-chat", component: Chat },

  // //Email 
  // { path: "/email-inbox", component: EmailInbox },
  // { path: "/email-read", component: EmailRead },

  // //Invoice
  // { path: "/invoices-list", component: InvoicesList },
  // { path: "/invoices-detail", component: InvoiceDetail },

  // //Contact
  // { path: "/contacts-grid", component: ContactsGrid },
  // { path: "/contacts-list", component: ContactsList },
  // { path: "/contacts-profile", component: ProfileTab },
  { path: "/myprofile", component: UserProfile },
  { path: "/scansettings", component: ScanSetting },
  { path: "/assetinventory", component: AssetList },
  { path: "/assetinventory/domain", component: Domain },
  { path: "/assetinventory/ip", component: IP },
  { path: "/assetinventory/subdomain", component: Subdomain },
  { path: "/assetinventory/mobileapplication", component: MobileApplication },
  { path: "/assetinventory/sourcecode", component: SourceCode },
  { path: "/exposedcredentials", component: CredentialBreach },
  { path: "/exposedsubdomains", component: SubdomainFinder },
  { path: "/exposedports", component: PortScan },
  { path: "/exposeddns", component: DNSLookup },
  { path: "/exposedreverseip", component: ReverseIPLookup },
  { path: "/exposedreversedns", component: ReverseDNSLookup },
  { path: "/exposedwhois", component: WHOisRecords },
  { path: "/subscription", component: Subscription },
  // { path: "/datatable", component: DatatableTables },

  // //Utility
  // { path: "/pages-starter", component: PagesStarter },
  // { path: "/pages-timeline", component: PageTimeline },
  // { path: "/pages-faqs", component: PageFaqs },
  // { path: "/pages-pricing", component: PagePricing },

  // //Components
  // { path: "/ui-alerts", component: UiAlert },
  // { path: "/ui-buttons", component: UiButton },
  // { path: "/ui-cards", component: UiCard },
  // { path: "/ui-carousel", component: UiCarousel },
  // { path: "/ui-dropdowns", component: UiDropdowns },
  // { path: "/ui-grid", component: UiGrid },
  // { path: "/ui-images", component: UiImages },
  // { path: "/ui-modals", component: UiModal },
  // { path: "/ui-drawer", component: UiDrawer },
  // { path: "/ui-progressbars", component: UiProgressbar },
  // { path: "/ui-tabs-accordions", component: UiTabsAccordions },
  // { path: "/ui-typography", component: UiTypography },
  // { path: "/ui-video", component: UiVideo },
  // { path: "/ui-general", component: UiGeneral },
  // { path: "/ui-colors", component: UiColors },

  // //Extended pages
  // { path: "/extended-lightbox", component: Lightbox },
  // { path: "/extended-rangeslider", component: Rangeslider },
  // { path: "/extended-sweet-alert", component: SweetAlert },
  // { path: "/extended-session-timeout", component: SessionTimeout },
  // { path: "/extended-rating", component: UiRating },
  // { path: "/extended-notifications", component: Notifications },

  //Forms
  { path: "/form-elements", component: FormElements },
  // { path: "/form-validation", component: FormValidation },
  // { path: "/form-advanced", component: AdvancedPlugins },
  // { path: "/form-editors", component: FormEditors },
  // { path: "/form-uploads", component: FormUpload },
  // { path: "/form-wizard", component: FormWizard },
  // { path: "/form-mask", component: FormMask },

  // //tables
  // { path: "/tables-basic", component: BasicTable },
  // { path: "/tables-datatable", component: DatatableTables },
  // { path: "/tables-responsive", component: ResponsiveTables },
  // { path: "/tables-editable", component: EditableTables },

  // //Charts
  // { path: "/charts-apex", component: Apexchart },
  // { path: "/charts-echart", component: EChart },
  // { path: "/dashboard2", component: Dashboard2 },
  // { path: "/charts-chartjs", component: ChartjsChart },
  // { path: "/charts-knob", component: KnobCharts },
  // { path: "/charts-sparkline", component: SparklineChart },

  // //Icons
  // { path: "/icons-boxicons", component: IconBoxicons },
  // { path: "/icons-materialdesign", component: IconMaterialdesign },
  // { path: "/icons-dripicons", component: IconDripicons },
  // { path: "/icons-fontawesome", component: IconFontawesome },

  // // Maps
  // { path: "/maps-google", component: MapsGoogle },
  // { path: "/maps-vector", component: MapsVector },
  // { path: "/maps-leaflet", component: MapsLeaflet },

  // this route should be at the end of all other routes
  { path: "/", exact: true, component: () => <Redirect to="/login" /> },
]

const authRoutes = [
  //authencation page
  // { path: "/gotoemail", component: GoToEmail }, ----- DUMP
  { path: "/account-verify/:resettoken", component: RegisterCheck }, 
  { path: "/account-verify-message" , component: RegisterSuccess},
  { path: "/account-password-reset/:resettoken", component: CheckForgotPassToken },
  { path: "/logout", component: Logout }, 
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  // { path: "/register", component: Register }, // Temporary Disabled
  { path: "/register_qth5n", component: Register }, // Alternate path
  // { path: "/register-success", component: RegisterCheck },

  //AuthenticationInner pages
  // { path: "/page-login", component: PageLogin },
  // { path: "/page-register", component: PageRegister },
  // { path: "/page-recoverpw", component: RecoverPassword },
  // { path: "/page-lock-screen", component: LockScreen },
  // { path: "/page-confirm-mail", component: ConfirmMail },
  // { path: "/page-email-verification", component: EmailVerification },
  // { path: "/page-two-step-verification", component: TwoStepVerfication },

  // //Utility page
  // { path: "/pages-maintenance", component: PageMaintenance },
  // { path: "/pages-comingsoon", component: PagesComingsoon },
  // { path: "/pages-404", component: Error404 },
  // { path: "/pages-500", component: Error500 },
]

export { userRoutes, authRoutes }
