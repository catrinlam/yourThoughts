# from django import forms
# from . import models
#
# class SurveyForm(forms.Form):
#     #email = forms.EmailField()
#     #question_1 = forms.ChoiceField(widget=forms.RadioSelect, choices=())
#     question1 = forms.FloatField(max_value=5, min_value=0)
#
#     def __init__(self, survey, *args, **kwargs):
#         super().__init__(*args, **kwargs)
#         self.survey = survey
#         del self.fields["question1"]
#         for question in survey.question_set.all():
#             self.fields[f"question {question.id}"] = forms.FloatField(max_value=5, min_value=0)
#             self.fields[f"Question {question.id}"].label = question.text
#           # choices = [(choice.id, choice.text) for choice in question.choice_set.all()]
#           # self.fields[f"question_{question.id}"] = forms.ChoiceField(widget=forms.RadioSelect, choices=choices)
#           # self.fields[f"question_{question.id}"].label = question.text