<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\UserType;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Session\Session;

#[Route('/users')]
final class UserController extends AbstractController
{
    #[Route(name: 'app_user_index', methods: ['GET'])]
    public function index(UserRepository $userRepository): Response
    {
        return $this->render('gestion_users/user/index.html.twig', [
            'users' => $userRepository->findAll(),
        ]);
    }

    #[Route('/new', name: 'app_user_new', methods: ['GET'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        if( !empty($data['nom']) || !empty($data['prenom']) || !empty($data['username']) ||
        !empty($data['password']) || !empty($data['position']) || !empty($data['adresse']) ||
         !empty($data['Tel1']) || !empty($data['Tel2'])){
            $data = json_decode($request->getContent(), true);
            $user = new User();
            $user->setNom($data['nom']);
            $user->setPrenom($data['prenom']);
            $user->setUsername($data['username']);
            $user->setPassword($data['password']);
            $user->setPosition($data['position']);
            $user->setAdresse($data['adresse']);
            $user->setTel1($data['Tel1']);
            $user->setTel2($data['Tel2']); 
        
            $entityManager->persist($user);
            $entityManager->flush();
            return $this->json(['status' => 'success', 'message' => 'User created successfully!']);
        }
        return $this->render('gestion_users/user/new.html.twig');
    }

    #[Route('/', name: 'app_user_store', methods: ['GET', 'POST'])]
    public function store(Request $request, EntityManagerInterface $entityManager): Response
    {
        $data = json_decode($request->getContent(), true);
        $user = new User();
        $user->setNom($data['nom']);
        $user->setPrenom($data['prenom']);
        $user->setUsername($data['username']);
        $user->setPassword($data['password']);
        $user->setPosition($data['position']);
        $user->setAdresse($data['adresse']);
        $user->setTel1($data['Tel1']);
        $user->setTel2($data['Tel2'] ?? null); 
    
        $entityManager->persist($user);
        $entityManager->flush();
    
        return $this->json(['status' => 'success', 'message' => 'User created successfully!']);
    }

    #[Route('/{id}', name: 'app_user_show', methods: ['GET'])]
    public function show(User $user): Response
    {
        return $this->render('gestion_users/user/show.html.twig', [
            'user' => $user,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_user_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, User $user, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(UserType::class, $user);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('app_user_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('gestion_users/user/edit.html.twig', [
            'user' => $user,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_user_delete', methods: ['POST'])]
    public function delete(Request $request, User $user, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$user->getId(), $request->getPayload()->getString('_token'))) {
            $entityManager->remove($user);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_user_index', [], Response::HTTP_SEE_OTHER);
    }
}
