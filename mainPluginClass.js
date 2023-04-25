public class GitHubCodeCompletionPlugin extends BasePlatformPlugin {
    public static final String PLUGIN_ID = "com.example.githubcodecompletion";
    private static GitHubCodeCompletionPlugin instance;

    public GitHubCodeCompletionPlugin() {
        super();
        instance = this;
    }

    public static GitHubCodeCompletionPlugin getDefault() {
        return instance;
    }

    public static String getPluginId() {
        return PLUGIN_ID;
    }

    @Override
        // TODO: Plugin initialization code
        public void start(BundleContext context) throws Exception {
            super.start(context);
            
            // Register code completion provider
            IContentAssistProcessor completionProcessor = new GitHubCodeCompletion();
            PlatformUI.getWorkbench().getEditorRegistry().setDefaultContentAssistProcessor(completionProcessor, IDocument.DEFAULT_CONTENT_TYPE);
            
            // Register syntax highlighting provider
            IPreferenceStore preferenceStore = getPreferenceStore();
            preferenceStore.setDefault(AbstractTextEditor.PREFERENCE_COLOR_BACKGROUND, "255, 255, 255");
            preferenceStore.setDefault(AbstractTextEditor.PREFERENCE_COLOR_FOREGROUND, "0, 0, 0");
            preferenceStore.setDefault(AbstractTextEditor.PREFERENCE_BOLD_SUFFIX, ", " + GitHubCodeCompletionPlugin.getPluginId() + ".markdown.bold");
            preferenceStore.setDefault(AbstractTextEditor.PREFERENCE_ITALIC_SUFFIX, ", " + GitHubCodeCompletionPlugin.getPluginId() + ".markdown.italic");
            preferenceStore.setDefault(AbstractTextEditor.PREFERENCE_UNDERLINE_SUFFIX, "");
            
            IToken boldToken = new Token(new TextAttribute(getColorRegistry().get(GitHubCodeCompletionPlugin.getPluginId() + ".markdown.bold")));
            IToken italicToken = new Token(new TextAttribute(getColorRegistry().get(GitHubCodeCompletionPlugin.getPluginId() + ".markdown.italic")));
            IToken linkToken = new Token(new TextAttribute(getColorRegistry().get(GitHubCodeCompletionPlugin.getPluginId() + ".markdown.link")));
            IToken imageToken = new Token(new TextAttribute(getColorRegistry().get(GitHubCodeCompletionPlugin.getPluginId() + ".markdown.image")));
            
            IPresentationReconciler reconciler = new DefaultDamagerRepairer(new GitHubMarkdownScanner(boldToken, italicToken, linkToken, imageToken)).getPresentationReconciler(null);
            reconciler.setDocumentPartitioning(IDocument.DEFAULT_CONTENT_TYPE);
            reconciler.setRepairer(new DefaultRepairer(new TextAttribute(getColorRegistry().get(AbstractTextEditor.PREFERENCE_COLOR_FOREGROUND))), IDocument.DEFAULT_CONTENT_TYPE);
            reconciler.setDamager(new GitHubMarkdownScanner(boldToken, italicToken, linkToken, imageToken), IDocument.DEFAULT_CONTENT_TYPE);
            
            ISourceViewerDecorationSupport support = new SourceViewerDecorationSupport(getSourceViewer(), getOverviewRuler(), getAnnotationAccess(), getColorRegistry());
            support.setCharacterPairMatcher(new DefaultCharacterPairMatcher(new char[] { '(', '[', '{', '\"', '\'' }, new char[] { ')', ']', '}', '\"', '\'' }));
            support.setReconciler(reconciler);
            support.install(getPreferenceStore());
        }
    

    @Override
    public void stop(BundleContext context) throws Exception {
        // TODO: Plugin cleanup code
            // Remove code completion provider
            IContentAssistProcessor completionProcessor = new GitHubCodeCompletion();
            PlatformUI.getWorkbench().getEditorRegistry().setDefaultContentAssistProcessor(completionProcessor, IDocument.DEFAULT_CONTENT_TYPE);
            
            // Remove syntax highlighting provider
            IPreferenceStore preferenceStore = getPreferenceStore();
            preferenceStore.setToDefault(AbstractTextEditor.PREFERENCE_COLOR_BACKGROUND);
            preferenceStore.setToDefault(AbstractTextEditor.PREFERENCE_COLOR_FOREGROUND);
            preferenceStore.setToDefault(AbstractTextEditor.PREFERENCE_BOLD_SUFFIX);
            preferenceStore.setToDefault(AbstractTextEditor.PREFERENCE_ITALIC_SUFFIX);
            preferenceStore.setToDefault(AbstractTextEditor.PREFERENCE_UNDERLINE_SUFFIX);
            
            ISourceViewer sourceViewer = getSourceViewer();
            if (sourceViewer != null) {
                ISourceViewerDecorationSupport support = sourceViewer.getDecorationSupport();
                if (support != null) {
                    support.uninstall();
                }
            }
            
            super.stop(context);
    }
}
